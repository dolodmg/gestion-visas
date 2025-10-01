'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { usePayment } from '@/hooks/usePayments';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('payment_id');
  const { payment, loading, error } = usePayment(paymentId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4">Verificando pago...</p>
        </div>
      </div>
    );
  }

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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago fallido!</h1>
        <p className="text-gray-600 mb-6">
          Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
        </p>
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/')}
            className="text-md font-light w-1/2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 hover:cursor-pointer"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => router.push(`/checkout?plan=${payment.idService}`)}
            className="text-md font-light w-1/2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 hover:cursor-pointer"
          >
            Reintentar pago
          </button>
        </div>
      </div>
    </div>
  );
}
