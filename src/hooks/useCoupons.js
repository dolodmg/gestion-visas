import { useEffect, useState } from "react";
import { getCouponByCodeAction } from "@/server/coupons";

export const useCoupon = (couponCode) => {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!couponCode) return;
    const fetchCoupon = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCouponByCodeAction(couponCode);
        setCoupon(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupon();
  }, [couponCode]);

  return { coupon, loading, error };
};