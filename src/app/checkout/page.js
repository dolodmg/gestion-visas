import { Suspense } from 'react';
import { CheckoutProvider } from '@/context/checkout_context';
import CheckoutPageContent from '@/components/checkout/checkout_page_content';

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <Suspense fallback={<div>Cargando checkout...</div>}>
        <CheckoutPageContent />
      </Suspense>
    </CheckoutProvider>
  );
}
