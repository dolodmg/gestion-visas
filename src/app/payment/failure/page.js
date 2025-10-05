import { Suspense } from 'react';
import PaymentFailureContent from '@/components/payment/payment_failure_content';

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div>Cargando pago...</div>}>
      <PaymentFailureContent />
    </Suspense>
  );
}
