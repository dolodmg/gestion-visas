import { Inter } from 'next/font/google';
import { ArrowLeft } from 'lucide-react';
import { useCheckout } from '@/context/checkout_context';
import SummaryPersonalInfo from './summary_personal_info';
import SummaryOrder from './summary_order';
import PaymentForm from './payment_form';
import processPaymentWithOrder from '@/components/checkout/stepper/process_payment_with_order';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','700'] });

const PaymentStep = ({ service, pricing, coupon, onPaymentSuccess, onPaymentError }) => {
  const { personalInfo, prevStep, createOrder } = useCheckout();

  const handlePaymentSubmit = async (formData) => {
    try {
      const orderData = await createOrder(service, coupon);
      const paymentResult = await processPaymentWithOrder(formData, orderData, service, pricing);
      onPaymentSuccess?.(paymentResult);
      return paymentResult;
    } catch (error) {
      console.error('❌ Error en el proceso completo:', error);
      onPaymentError?.(error);
      throw error;
    }
  };

  return (
    <div className={`${inter.className}`}>
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={prevStep}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          Confirmación y pago
        </h2>
      </div>

      <SummaryPersonalInfo personalInfo={personalInfo} onEdit={prevStep} />
      <SummaryOrder service={service} pricing={pricing} coupon={coupon} />

      <PaymentForm
        service={service}
        pricing={pricing}
        personalInfo={personalInfo}
        onPaymentSubmit={handlePaymentSubmit}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </div>
  );
};

export default PaymentStep;
