import MercadoPagoPayment from '@/components/checkout/mercado_pago_payment';

const PaymentForm = ({ service, pricing, personalInfo, onPaymentSubmit, onPaymentSuccess, onPaymentError }) => (
  <div className="space-y-4">
    <h3 className="font-medium text-gray-900">Formulario de pago</h3>
    <MercadoPagoPayment
      amount={pricing?.total || 0}
      description={service?.serviceName || 'Servicio'}
      personalInfo={personalInfo}
      onPaymentSubmit={onPaymentSubmit}
      onPaymentSuccess={onPaymentSuccess}
      onPaymentError={onPaymentError}
    />
  </div>
);

export default PaymentForm;
