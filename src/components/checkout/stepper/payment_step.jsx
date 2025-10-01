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
  const { personalInfo, prevStep, createOrder, updateOrder } = useCheckout();
  const [orderData, setOrderData] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isInitializingRef = useRef(false); 
  const [totalPriceArs, setTotalPriceArs] = useState(null);

  useEffect(() => {
    const initializeOrder = async () => {
      if (orderData || isInitializingRef.current) {
        return;
      }
      
      if (!personalInfo?.email) {
        return;
      }

      isInitializingRef.current = true;
      setIsLoading(true);
      
      try {
        const order = await createOrder(service, coupon);
        setOrderData(order);
        setTotalPriceArs(order.totalPriceArs);
        const preferenceData = {
          totalPrice: pricing.total,
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

        setPreferenceId(data.preferenceId);
        console.log('✅ Orden y preference creadas:', { 
          orderId: order.orderId,
          externalReference: order.externalReference,
          preferenceId: data.preferenceId 
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

  const handleGoBack = async () => {
    if (orderData) {
      console.log('💡 Usuario vuelve atrás - orden quedará como DRAFT para posible actualización');
    }
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
      <SummaryOrder service={service} pricing={pricing} coupon={coupon} />

      {isLoading ? (
        <div className="p-8 bg-blue-50 rounded-lg text-center mt-6">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-700">Preparando opciones de pago...</span>
          </div>
        </div>
      ) : (
        <PaymentForm
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