import { Suspense } from 'react';
import PaymentSuccessContent from '@/components/payment/payment_success_content';

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando pago...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}