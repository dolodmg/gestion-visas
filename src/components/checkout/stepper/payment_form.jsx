import MercadoPagoPayment from '@/components/checkout/mercado_pago_payment';

const PaymentForm = ({ 
  service, 
  pricing, 
  personalInfo,
  preferenceId,
  orderData,
  totalPriceArs, 
  onPaymentSubmit, 
  onPaymentSuccess,
  onPaymentPending, 
  onPaymentError 
}) => {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-medium text-gray-900">Completa tu pago</h3>
      
      <MercadoPagoPayment
        amount={totalPriceArs || 0} 
        description={service?.serviceName || 'Servicio'}
        personalInfo={personalInfo}
        preferenceId={preferenceId}
        onPaymentSubmit={onPaymentSubmit}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentPending={onPaymentPending}
        onPaymentError={onPaymentError}
      />
    </div>
  );
};

export default PaymentForm;