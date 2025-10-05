import { useEffect, useState } from "react";
import { verifyPaymentAction } from "@/server/payments";

export const usePayment = (paymentId) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!paymentId || paymentId === 'unknown') {
      setError('ID de pago no válido');
      return;
    }

    const verifyPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await verifyPaymentAction(paymentId);
        setPayment(data);
      } catch (err) {
        console.error('Error verificando pago:', err);
        setError(err?.message || "Error verificando pago");
        setPayment({ status: 'rejected', id: paymentId });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

  return { payment, loading, error };
};