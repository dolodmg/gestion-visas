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
  isPersonalInfoValid,
  externalReference,
  showPaymentForm
}) => {
  
  const isPaymentEnabled = isPersonalInfoValid && externalReference;
  return (
    <div className={`${inter.className} `}>
      <div className="flex items-center gap-2 pb-4">
        <CreditCard className="w-5 h-5 text-slate-700" />
        <h2 className="text-md font-medium text-slate-700">
          Medios de pago
        </h2>
      </div>
      {!showPaymentForm ? (
        // Mostrar mensaje de completar formulario
        <div className="relative opacity-50 pointer-events-none">
          <div className="p-4 bg-gray-50 text-gray-600 rounded-lg text-center">
            Complete los datos personales para habilitar los medios de pago
          </div>
        </div>
      ) : !externalReference ? (
        // Mostrar que se está creando la orden
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Preparando orden de pago...
          </div>
        </div>
      ) : (
        // Mostrar formulario de pago
        <MercadoPagoPayment
          amount={amount}
          description={description}
          personalInfo={personalInfo}
          paymentType="brick"
          externalReference={externalReference}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
      )}
    </div>
  );
};

export default PaymentMethods;