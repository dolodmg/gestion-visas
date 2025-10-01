'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { usePayment } from '@/hooks/usePayments';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

export default function PaymentPending() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('payment_id');
  const { payment, loading, error } = usePayment(paymentId);

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 flex items-center justify-center`}>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4">Verificando pago...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-red-600 mb-6">
            <p>Error verificando pago: {error}</p>
          </div>
        )}

        {!loading && payment && (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
              className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago en proceso</h1>
              <p className="text-zinc-600 mb-6">
                Tu pago está siendo procesado y puede tardar unos minutos en confirmarse.
              </p>
            <div className="text-lg text-zinc-700 font-semibold mb-6">
              <p>Tu número de orden: {payment.idOrder}</p>
            </div>
          </>
        )}

        <button
          onClick={() => router.push('/')}
          className="text-md font-light w-full bg-yellow-700 text-white py-2 px-4 rounded-lg hover:bg-yellow-800 hover:cursor-pointer"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}