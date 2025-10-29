'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { usePayment } from '@/hooks/usePayments';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

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
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${inter.className} bg-gray-50 px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8`}
    >
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 text-center">
        
        {/* Icono de error */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg 
            className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {isCancellation ? (
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Pago cancelado
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-2">
              No completaste el pago. Podés intentarlo nuevamente.
            </p>
          </>
        ) : error ? (
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Error verificando pago
            </h1>
            <p className="text-sm sm:text-base text-red-600 mb-6 px-2 bg-red-50 py-3 rounded-lg">
              {error}
            </p>
          </>
        ) : payment ? (
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Pago rechazado
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 px-2">
              Tu pago fue rechazado. Verificá los datos de tu tarjeta e intentá nuevamente.
            </p>
            {payment.idOrder && (
              <div className="text-base sm:text-lg text-zinc-700 font-semibold mb-6 bg-gray-50 py-3 sm:py-4 px-4 rounded-lg">
                <p className="break-words">
                  Número de orden: <span className="text-red-600">{payment.idOrder}</span>
                </p>
              </div>
            )}
          </>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={() => router.push('/')}
            className="text-sm sm:text-base md:text-lg font-light w-full sm:w-1/2 bg-gray-200 text-gray-700 py-3 sm:py-3.5 px-4 rounded-lg hover:bg-gray-300 hover:cursor-pointer transition-colors duration-200 active:scale-95 transform"
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
            className="text-sm sm:text-base md:text-lg font-light w-full sm:w-1/2 bg-red-600 text-white py-3 sm:py-3.5 px-4 rounded-lg hover:bg-red-700 hover:cursor-pointer transition-colors duration-200 active:scale-95 transform"
          >
            Reintentar pago
          </button>
        </div>
      </div>
    </div>
  );
}