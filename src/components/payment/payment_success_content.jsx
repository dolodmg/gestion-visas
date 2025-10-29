'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { usePayment } from '@/hooks/usePayments';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('payment_id');
  const { payment, loading, error } = usePayment(paymentId);

  return (
    <div className={`${inter.className} bg-gray-50 px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8`}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 text-center">

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-sm sm:text-base text-gray-600">Verificando pago...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-red-600 mb-6">
            <p className="text-sm sm:text-base">Error verificando pago: {error}</p>
          </div>
        )}

        {!loading && payment && (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              ¡Pago exitoso!
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-2">
              Tu pago ha sido procesado correctamente.
            </p>
            
            <div className="text-base sm:text-lg text-zinc-700 font-semibold mb-6 sm:mb-8 bg-gray-50 py-3 sm:py-4 px-4 rounded-lg">
              <p className="break-words">
                Tu número de orden: <span className="text-green-600">{payment.idOrder}</span>
              </p>
            </div>
          </>
        )}

        <button
          onClick={() => router.push('/')}
          className="text-sm sm:text-base md:text-lg font-light w-full bg-slate-700 text-white py-3 sm:py-3.5 px-4 rounded-lg hover:bg-slate-800 hover:cursor-pointer transition-colors duration-200 active:scale-95 transform"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}