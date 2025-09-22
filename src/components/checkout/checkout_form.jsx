import PersonalInfoForm from './personal_info_form';
import SecurityNote from './security_note';
import PaymentMethods from './payment_methods';
import { Button } from '@/components/ui/button';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const CheckoutForm = ({ 
  formData, 
  selectedPayment, 
  onFormDataChange, 
  onPaymentChange, 
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className={`${inter.className} space-y-8`}>
      <PersonalInfoForm 
        data={formData.personalInfo}
        onChange={(field, value) => onFormDataChange('personalInfo', field, value)}
      />
      <SecurityNote />
      <PaymentMethods 
        selected={selectedPayment}
        paymentData={formData.paymentInfo}
        onPaymentChange={onPaymentChange}
        onDataChange={(field, value) => onFormDataChange('paymentInfo', field, value)}
      />

      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="text-white py-3 rounded-lg font-normal text-md transition-colors bg-slate-800 hover:bg-slate-950"
        >
          Contratar
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;