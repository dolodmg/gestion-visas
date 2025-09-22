import { CreditCard } from 'lucide-react';
import PaymentOption from './payment_option';
import CardPaymentForm from './card_payment_form';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const PaymentMethods = ({ selected, paymentData, onPaymentChange, onDataChange }) => {
  const paymentOptions = [
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Pago rápido y seguro',
    logo: '/images/mp.png',
    logoType: 'image'
  },
  {
    id: 'card',
    name: 'Tarjeta de débito o crédito',
    description: 'Pago directo con tu tarjeta',
    logo: CreditCard,
    logoType: 'icon'
  }
];


  return (
    <div className={`${inter.className} space-y-6`}>
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
        <CreditCard className="w-5 h-5 text-slate-700" />
        <h2 className="text-md font-medium text-slate-700">
          Medios de pago
        </h2>
      </div>

      <div className="space-y-4">
        {paymentOptions.map((option) => (
          <PaymentOption
            key={option.id}
            option={option}
            isSelected={selected === option.id}
            onSelect={() => onPaymentChange(option.id)}
          >
            {option.id === 'card' && selected === 'card' && (
              <CardPaymentForm 
                data={paymentData}
                onChange={onDataChange}
              />
            )}
          </PaymentOption>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;