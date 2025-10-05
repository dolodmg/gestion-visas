import { useEffect, useState } from "react";

export const usePayment = (paymentId) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!paymentId || paymentId === 'unknown') {
      setError('ID de pago no válido');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      console.log('🔍 Verificando pago:', paymentId);
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/payments/${paymentId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error verificando pago');
        }
        
        const data = await response.json();
        console.log('✅ Pago verificado:', data);
        setPayment(data);
      } catch (err) {
        console.error('❌ Error verificando pago:', err);
        setError(err.message || "Error verificando pago");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

  return { payment, loading, error };
};