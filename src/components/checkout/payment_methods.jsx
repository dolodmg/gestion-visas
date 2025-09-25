import { CreditCard } from 'lucide-react';
import MercadoPagoPayment from './mercado_pago_payment';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const PaymentMethods = ({ 
  amount,
  description,
  personalInfo,
  onPaymentSuccess,
  onPaymentError,
  isPersonalInfoValid
}) => {
  return (
    <div className={`${inter.className} `}>
      <div className="flex items-center gap-2 pb-4">
        <CreditCard className="w-5 h-5 text-slate-700" />
        <h2 className="text-md font-medium text-slate-700">
          Medios de pago
        </h2>
      </div>
      <div className={`relative ${!isPersonalInfoValid ? 'opacity-50 pointer-events-none' : ''}`}>
        <MercadoPagoPayment
          amount={amount}
          description={description}
          personalInfo={personalInfo}
          paymentType="brick"
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
</div>

    </div>
  );
};

export default PaymentMethods;