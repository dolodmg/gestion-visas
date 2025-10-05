'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { usePayment } from '@/hooks/usePayments';

const inter = Inter({ subsets: ['latin'] });

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentId = searchParams.get('payment_id');
  const isCancellation =
    !paymentId || paymentId === 'null' || paymentId === 'desconocido';

  const {
    payment,
    loading: paymentLoading,
    error: paymentError,
  } = usePayment(isCancellation ? null : paymentId);

  const error = paymentError;
  const serviceId = payment?.idService;

  if (paymentLoading) {
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
    <div
      className={`${inter.className} min-h-screen bg-gray-50 flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
        {isCancellation ? (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Pago cancelado
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              No completaste el pago. Podés intentarlo nuevamente.
            </p>
          </>
        ) : error ? (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Error verificando pago
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          </>
        ) : payment ? (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Pago rechazado
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Tu pago fue rechazado. Verificá los datos de tu tarjeta e intentá
              nuevamente.
            </p>
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
              if (serviceId) {
                router.push(`/checkout?plan=${serviceId}`);
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
