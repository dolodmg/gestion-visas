import PersonalInfoForm from './personal_info_form';
import SecurityNote from './security_note';
import PaymentMethods from './payment_methods';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const CheckoutForm = ({ 
  service,
  formData,  
  onFormDataChange, 
  onSubmit,
  pricing,
  // ✅ NUEVAS props para MP
  amount,
  description,
  onPaymentSuccess,
  onPaymentError,
  paymentStatus
}) => {

  const isPersonalInfoValid = 
  formData.personalInfo.nombre.trim() &&
  formData.personalInfo.apellido.trim() &&
  formData.personalInfo.email.trim() &&
  formData.personalInfo.telefono.trim() &&
  formData.personalInfo.documento.trim();


  // ✅ Mostrar mensaje de éxito si el pago fue exitoso
  if (paymentStatus?.type === 'success') {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">¡Pago Exitoso!</h2>
        <p className="text-green-700 mb-2">Tu pago ha sido procesado correctamente.</p>
        <p className="text-sm text-gray-600">ID de pago: {paymentStatus.data.id}</p>
        <p className="text-sm text-gray-600">Redirigiendo...</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${inter.className} space-y-8 `}>
      <PersonalInfoForm 
        data={formData.personalInfo}
        onChange={(field, value) => onFormDataChange('personalInfo', field, value)}
      />
      
      <SecurityNote />
      
      <PaymentMethods 
        amount={amount}
        description={description}
        personalInfo={formData.personalInfo}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        isPersonalInfoValid={isPersonalInfoValid}
      />
    </form>
  );
};

export default CheckoutForm;