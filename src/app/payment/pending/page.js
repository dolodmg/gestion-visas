import { Suspense } from 'react';
import PaymentPendingContent from '@/components/payment/payment_pending_content';

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={<div>Cargando pago...</div>}>
      <PaymentPendingContent />
    </Suspense>
  );
}