import { useEffect, useState, useRef, useMemo } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const MercadoPagoPayment = ({
  amount,
  description,
  personalInfo,
  onPaymentSubmit, 
  onPaymentSuccess,
  onPaymentError
}) => {
  const [mp, setMp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [brickInitialized, setBrickInitialized] = useState(false);

  const brickInstanceRef = useRef(null);
  
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

    useEffect(() => {
      if (mp && isScriptLoaded && !brickInitialized) {
        initPaymentBrick();
      }
    }, [mp, isScriptLoaded, brickInitialized]);
    
  const initPaymentBrick = () => {
    if (brickInitialized || brickInstanceRef.current) return;

    const container = document.getElementById('mp-payment-brick-container');
    if (!container) return console.error('Contenedor del Payment Brick no encontrado');

    container.innerHTML = '';
    if (brickInstanceRef.current) {
      try { brickInstanceRef.current.unmount(); } 
      catch (e) { console.log('Error unmounting previous brick:', e); }
    }

    mp.bricks().create('payment', 'mp-payment-brick-container', {
      initialization: { 
        amount: amount
      },
      customization: {
        paymentMethods: { 
          creditCard: 'all', 
          debitCard: 'all', 
          mercadoPago: 'all',
          bankTransfer: 'all',
          ticket: 'all'
        },
        visual: { 
          hideFormTitle: true,
          hideRedirectionPanel: false,
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
        onReady: () => setBrickInitialized(true),
        onSubmit: async ({ formData }) => {
          console.log('onSubmit - formData completo:', formData);
          setLoading(true);
          try {
            const enrichedFormData = {
              ...formData,
              payerEmail: memoizedPersonalInfo.email,
              payerName: memoizedPersonalInfo.name,
              transaction_amount: formData.transaction_amount || amount
          }
          
          if (onPaymentSubmit) {
              await onPaymentSubmit(enrichedFormData);
            } else {
              console.warn('⚠️ onPaymentSubmit no definido - usando flujo por defecto');
              // Fallback al comportamiento anterior si no se pasa onPaymentSubmit
              await processPaymentDirect(enrichedFormData);
            }

          } catch (error) {
            console.error('❌ Error en onSubmit:', error);
            onPaymentError?.(error);
          } finally {
            setLoading(false);
          }
        },
        onError: (error) => {
          console.error('❌ Error del Payment Brick:', error);
          onPaymentError?.(error);
        }
      }
    }).then(instance => {
      brickInstanceRef.current = instance;
      console.log('✅ Payment Brick creado exitosamente');
    })
    .catch(error => {
      console.error('❌ Error creando Payment Brick:', error);
      onPaymentError?.(error);
    });
  };

  // ✅ Fallback - método directo (solo si no se usa onPaymentSubmit)
  const processPaymentDirect = async (formData) => {
    console.log('⚠️ Usando procesamiento directo (fallback)');
    
    // Para métodos de redirección, crear preference
    if (!formData.payment_method_id || 
        formData.payment_method_id === 'account_money' ||
        !formData.token) {
      
      console.log('🔄 Método de redirección - creando preference...');
      await createAndRedirectToPreference(formData);
      
    } else {
      // Para tarjetas, procesar directamente
      console.log('💳 Método con token - procesando...');
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
      // ❌ Sin externalReference porque no hay orden creada aún
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
        // ❌ Sin externalReference porque no hay orden creada aún
        formData: paymentFormData
      })
    });

    const result = await mpResponse.json();
    if (!mpResponse.ok) throw new Error(result.error || 'Error procesando el pago');

    if (result.status === 'approved' || result.status === 'pending') {
      onPaymentSuccess?.(result);
    } else {
      onPaymentError?.(result);
    }
  };

  // Cleanup brick
  useEffect(() => () => {
    if (brickInstanceRef.current) {
      try { brickInstanceRef.current.unmount(); } 
      catch (e) { console.log('Error unmounting brick on cleanup:', e); }
    }
  }, []);

  return (
    <div className={`${inter.className} `}>
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mx-4">
        <div className="flex items-start gap-2">
          <div className="text-green-600 mt-0.5">🔒</div>
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">Pago seguro con Mercado Pago</p>
            <p className="text-green-700">Completa tu pago sin salir de la página. Aceptamos todas las tarjetas.</p>
          </div>
        </div>
      </div>
      <div id="mp-payment-brick-container">
        {loading && (
          <div className="flex flex-col justify-center items-center h-40 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Procesando pago seguro...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MercadoPagoPayment;