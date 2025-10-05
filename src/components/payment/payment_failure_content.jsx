'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { usePayment } from '@/hooks/usePayments';
import { useOrder } from '@/hooks/useOrders';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('payment_id');
  const collectionId = searchParams.get('collection_id');
  const orderId = searchParams.get('order');
  
  const isCancellation = !paymentId || paymentId === 'null' || paymentId === 'desconocido';
  
  const { payment, loading: paymentLoading, error: paymentError } = usePayment(isCancellation ? null : paymentId);
  const { order, loading: orderLoading, error: orderError } = useOrder(isCancellation && orderId ? orderId : null);
  
  const loading = paymentLoading || orderLoading;
  const error = paymentError || orderError;
  const serviceId = payment?.idService || order?.idService;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-base sm:text-lg">Verificando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 flex items-center justify-center p-4`}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">

        {isCancellation ? (
          <>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pago cancelado</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              No completaste el pago. Si tenés algún problema, podés intentarlo nuevamente.
            </p>
          </>
        ) : error ? (
          <>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Error verificando pago</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          </>
        ) : payment ? (
          <>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pago rechazado</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Tu pago fue rechazado. Por favor, verificá los datos de tu tarjeta e intentá nuevamente.
            </p>
            {payment.statusDetail && (
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Detalle: {payment.statusDetail}
              </p>
            )}
          </>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-sm sm:text-base font-light w-full sm:w-1/2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => {
              const planId = payment?.idService || serviceId;
              if (planId) {
                router.push(`/checkout?plan=${planId}`);
              } else {
                router.push('/');
              }
            }}
            className="text-sm sm:text-base font-light w-full sm:w-1/2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar pago
          </button>
        </div>
      </div>
    </div>
  );
}
