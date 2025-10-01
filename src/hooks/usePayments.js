import { useEffect, useState } from "react";
import { verifyPaymentAction } from "@/server/payments";

export const usePayment = (paymentId) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!paymentId) return;
    const verifyPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await verifyPaymentAction(paymentId);
        setPayment(data);
      } catch (err) {
        setError(error.message || "Error verificando pago");
      } finally {
        setLoading(false);
      }
    };
    verifyPayment();
  }, [paymentId]);

  return { payment, loading, error };
};