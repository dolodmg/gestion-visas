import { Inter } from 'next/font/google';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCheckout } from '@/context/checkout_context';
import SummaryPersonalInfo from './summary_personal_info';
import SummaryOrder from './summary_order';
import PaymentForm from './payment_form';
import processPaymentWithOrder from '@/components/checkout/stepper/process_payment_with_order';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','700'] });

const PaymentStep = ({ service, pricing, coupon, onPaymentSuccess, onPaymentPending, onPaymentError }) => {
  const { personalInfo, prevStep, createOrder, updateOrder, order: contextOrder, coupon: contextCoupon } = useCheckout();
  const [orderData, setOrderData] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isInitializingRef = useRef(false); 
  const [totalPriceArs, setTotalPriceArs] = useState(null);
  const previousCouponRef = useRef(undefined);
  const previousOrderIdRef = useRef(null);

  // Función para crear una nueva preference de MercadoPago
  const createPreference = async (order) => {
    const preferenceData = {
      totalPrice: order.totalPrice, 
      description: service.serviceName,
      quantity: service.quantity || 1,
      customerMail: personalInfo.email,
      customerName: `${personalInfo.nombre} ${personalInfo.apellido}`,
      externalReference: order.externalReference
    };

    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferenceData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error creando preferencia');
    
    return data.preferenceId;
  };

  // Inicializar orden cuando entramos al paso de pago
  useEffect(() => {
    const initializeOrder = async () => {
      if (isInitializingRef.current || !personalInfo?.email) {
        return;
      }

      isInitializingRef.current = true;
      setIsLoading(true);
      
      try {
        let order;
        
        if (contextOrder?.orderId) {
          console.log('✅ Reutilizando orden existente:', contextOrder.orderId);
          order = await updateOrder(contextOrder.orderId, service, contextCoupon);
          previousOrderIdRef.current = order.orderId;
        } else {
          console.log('🆕 Creando nueva orden');
          order = await createOrder(service, contextCoupon);
          previousOrderIdRef.current = order.orderId;
        }
        
        setOrderData(order);
        setTotalPriceArs(order.totalPriceArs); 
    
        const newPreferenceId = await createPreference(order);
        setPreferenceId(newPreferenceId);
        
        console.log('✅ Orden y preference creadas/actualizadas:', { 
          orderId: order.orderId,
          externalReference: order.externalReference,
          preferenceId: newPreferenceId,
          coupon: contextCoupon?.couponCode || 'ninguno'
        });

      } catch (error) {
        console.error('❌ Error inicializando orden:', error);
        onPaymentError?.(error);
      } finally {
        setIsLoading(false);
        isInitializingRef.current = false;
      }
    };

    initializeOrder();
  }, []); 

  useEffect(() => {
  const handleCouponChange = async () => {
    if (!orderData?.orderId || isInitializingRef.current) return;
    
    const currentCoupon = contextCoupon?.couponCode || null;
    
    if (previousCouponRef.current === undefined) {
      previousCouponRef.current = currentCoupon;
      console.log('Inicializando previousCouponRef con:', currentCoupon);
      return;
    }
    
    const previousCoupon = previousCouponRef.current;
    
    if (currentCoupon !== previousCoupon) {
      console.log('el cupón cambió, actualizando orden...', { 
        previous: previousCoupon, 
        current: currentCoupon 
      });
      
      setIsLoading(true);
      
      try {
        const updatedOrder = await updateOrder(orderData.orderId, service, contextCoupon);
        setOrderData(updatedOrder);
        setTotalPriceArs(updatedOrder.totalPriceArs);
        previousCouponRef.current = currentCoupon;
        
        const newPreferenceId = await createPreference(updatedOrder);
        setPreferenceId(newPreferenceId);
        
        console.log('Orden y preference actualizadas con nuevo cupón');
        
      } catch (error) {
        console.error('Error actualizando orden con cupón:', error);
        onPaymentError?.(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  handleCouponChange();
  }, [contextCoupon]);

  const handleGoBack = () => {
    console.log('⬅️ Usuario vuelve al paso 1 - orden se mantendrá para actualización');
    prevStep();
  };

  const handlePaymentSubmit = async (formData) => {
    try {
      const payment = await processPaymentWithOrder(formData, orderData, service, pricing);
      onPaymentSuccess?.(payment);
      return payment;
    } catch (error) {
      console.error('❌ Error en el proceso de pago:', error);
      onPaymentError?.(error);
      throw error;
    }
  };

  return (
    <div className={`${inter.className}`}>
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={handleGoBack}
          disabled={isLoading}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          Confirmación y pago
        </h2>
      </div>

      <SummaryPersonalInfo personalInfo={personalInfo} onEdit={handleGoBack} />
      <SummaryOrder service={service} pricing={pricing} coupon={contextCoupon} />

      {isLoading ? (
        <div className="p-8 bg-blue-50 rounded-lg text-center mt-6">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-700">
              {!preferenceId ? 'Preparando opciones de pago...' : 'Actualizando precio...'}
            </span>
          </div>
        </div>
      ) : (
        <PaymentForm
          key={preferenceId}
          service={service}
          pricing={pricing}
          personalInfo={personalInfo}
          preferenceId={preferenceId}
          orderData={orderData}
          totalPriceArs={totalPriceArs} 
          onPaymentSubmit={handlePaymentSubmit}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentPending={onPaymentPending}
          onPaymentError={onPaymentError}
        />
      )}
    </div>
  );
};

export default PaymentStep;