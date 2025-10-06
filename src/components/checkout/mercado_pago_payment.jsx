import { useEffect, useState, useRef, useMemo } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const MercadoPagoPayment = ({
  amount,
  description,
  personalInfo,
  preferenceId, 
  externalReference,
  onPaymentSubmit, 
  onPaymentSuccess,
  onPaymentError
}) => {
  const [mp, setMp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [brickInitialized, setBrickInitialized] = useState(false);

  const brickInstanceRef = useRef(null);
  const initializingRef = useRef(false);
  
  const memoizedPersonalInfo = useMemo(() => ({
    email: personalInfo?.email,
    name: `${personalInfo?.nombre || ''} ${personalInfo?.apellido || ''}`.trim() || undefined
  }), [personalInfo?.email, personalInfo?.nombre, personalInfo?.apellido]);

  // Cargar SDK
  useEffect(() => {
    if (window.MercadoPago) {
      setMp(new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY));
      setIsScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => {
      setMp(new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY));
      setIsScriptLoaded(true);
    };
    script.onerror = () => onPaymentError?.({ message: 'Error cargando SDK de MercadoPago' });
    document.head.appendChild(script);
  }, []);

  // 🆕 Cleanup cuando cambia preferenceId
  useEffect(() => {
    if (brickInstanceRef.current && preferenceId) {
      console.log('🔄 PreferenceId cambió, limpiando brick anterior...');
      try {
        brickInstanceRef.current.unmount();
      } catch (e) {
        console.log('Error unmounting:', e);
      }
      brickInstanceRef.current = null;
      initializingRef.current = false;
      setBrickInitialized(false);
      
      // Limpiar el container
      const container = document.getElementById('mp-payment-brick-container');
      if (container) {
        container.innerHTML = '';
      }
    }
  }, [preferenceId]);

  useEffect(() => {
    console.log('🔍 useEffect ejecutado:', {
      mp: !!mp,
      isScriptLoaded,
      brickInitialized,
      preferenceId,
      hasInstance: !!brickInstanceRef.current
    });

    if (mp && isScriptLoaded && !brickInitialized && preferenceId) {
      initPaymentBrick();
    }
  }, [mp, isScriptLoaded, brickInitialized, preferenceId]);
    
  const initPaymentBrick = () => {
    if (brickInitialized || brickInstanceRef.current || initializingRef.current) {
      console.log('⚠️ Brick ya inicializado o en proceso, evitando duplicación');
      return;
    }

    const container = document.getElementById('mp-payment-brick-container');
    if (!container) {
      console.error('Contenedor del Payment Brick no encontrado');
      return;
    }

    initializingRef.current = true;
    container.innerHTML = '';
    
    console.log('🔧 Inicializando Payment Brick con preferenceId:', preferenceId);

    mp.bricks().create('payment', 'mp-payment-brick-container', {
      initialization: { 
        amount: amount,
        preferenceId: preferenceId,
        payer: {
          email: memoizedPersonalInfo.email,
        }
      },
      customization: {
        paymentMethods: { 
          maxInstallments: 12,
          minInstallments: 1,
          creditCard: 'all',
          debitCard: 'all',
          mercadoPago: 'all'
        },
        visual: { 
          hideFormTitle: true,
          hideRedirectionPanel: false,
          hidePaymentButton: false,
          style: { 
            theme: 'bootstrap', 
            customVariables: { 
              fontSizeMedium: '12px', 
              formPadding: '16px'
            } 
          } 
        }
      },
      locale: 'es-AR',
      callbacks: {
        onReady: () => {
          console.log('✅ Payment Brick listo');
          setBrickInitialized(true);
        },
        onSubmit: async ({ formData }) => {
          console.log('📤 onSubmit - formData completo:', formData);
          
          if (!formData) {
            console.log("🔄 Método de redirección - MP manejará automáticamente");
            return; 
          }

          setLoading(true);
          
          try {
            const enrichedFormData = {
              ...formData,
              payerEmail: memoizedPersonalInfo.email,
              payerName: memoizedPersonalInfo.name,
              transaction_amount: formData.transaction_amount || amount,
            };

            if (onPaymentSubmit) {
              await onPaymentSubmit(enrichedFormData);
            } else {
              await processPaymentDirect(enrichedFormData);
            }

          } catch (error) {
            onPaymentError?.(error);
          } finally {
            setLoading(false);
          }
        },
        onError: (error) => {
          console.error('❌ Error del Payment Brick:', error);
          onPaymentError?.(error);
        },
        onBinChange: (bin) => {
          console.log('🔢 BIN changed:', bin);
        }
      }
    }).then(instance => {
      brickInstanceRef.current = instance;
      initializingRef.current = false; 
    })
    .catch(error => {
      initializingRef.current = false; 
      onPaymentError?.(error);
    });
  };

  const processPaymentDirect = async (formData) => {
    if (!formData.payment_method_id || 
        formData.payment_method_id === 'account_money' ||
        !formData.token) {
      await createAndRedirectToPreference(formData);
    } else {
      await processDirectPayment(formData);
    }
  };

  const createAndRedirectToPreference = async (formData) => {
    const preferenceData = {
      totalPrice: amount,
      description,
      quantity: 1,
      customerMail: memoizedPersonalInfo.email,
      customerName: memoizedPersonalInfo.name,
      externalReference: formData.externalReference 
    };

    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferenceData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error creando preferencia');

    window.location.href = data.checkoutUrl || data.sandboxUrl;
  };

  const processDirectPayment = async (formData) => {
    const paymentFormData = {
      token: formData.token,
      email: formData.payerEmail,
      installments: formData.installments || 1,
      payment_method_id: formData.payment_method_id,
      issuer_id: formData.issuer_id,
      transaction_amount: formData.transaction_amount || amount,
      identification_type: formData.payer?.identification?.type,
      identification_number: formData.payer?.identification?.number,
      first_name: memoizedPersonalInfo.name?.split(' ')[0] || ''
    };

    const mpResponse = await fetch('/api/mercadopago/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount, 
        description, 
        externalReference: formData.externalReference, 
        formData: paymentFormData
      })
    });

    const result = await mpResponse.json();
    if (!mpResponse.ok) throw new Error(result.error || 'Error procesando el pago');

    if (result.status === 'approved') {
      console.log('✅ Pago aprobado');
      onPaymentSuccess?.(result);
      if (!onPaymentSuccess) {
        window.location.href = `/payment/success?payment_id=${result.id}`;
      }
    } else if (result.status === 'pending' || result.status === 'in_process') {
      window.location.href = `/payment/pending?payment_id=${result.id}`;
    } else {
      window.location.href = `/payment/failure?payment_id=${result.id || 'unknown'}`;
      onPaymentError?.(result);
    }
  };

  // Cleanup brick cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (brickInstanceRef.current) {
        try { 
          console.log('🧹 Limpiando brick al desmontar...');
          brickInstanceRef.current.unmount(); 
          brickInstanceRef.current = null;
          initializingRef.current = false;
          setBrickInitialized(false);
        } 
        catch (e) { 
          console.log('Error unmounting brick on cleanup:', e); 
        }
      }
    };
  }, []);

  return (
    <div className={`${inter.className}`}>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <div className="text-blue-600 mt-0.5">🔒</div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Pago seguro con Mercado Pago</p>
            <p className="text-blue-700">
              Paga con tarjeta o desde tu cuenta de Mercado Pago
            </p>
          </div>
        </div>
      </div>
      
      <div id="mp-payment-brick-container">
        {(!preferenceId || loading) && (
          <div className="flex flex-col justify-center items-center h-40 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">
              {!preferenceId ? 'Preparando formulario...' : 'Procesando pago seguro...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MercadoPagoPayment;