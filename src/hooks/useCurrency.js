import { useEffect, useState } from "react";
import { convertUsdToArsAction } from "@/server/currency";

export const useCurrency = (amount) => {
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!amount) return;
    const fetchCurrency = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await convertUsdToArsAction(amount);
        setCurrency(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrency();
  }, [amount]);

  return { currency, loading, error };
};