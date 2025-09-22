import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const OrderCouponInput = ({ onValidateCoupon, couponStatus, loading }) => {
  const [coupon, setCoupon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coupon.trim()) {
      onValidateCoupon(coupon.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Ingresá tu cupón"
        value={coupon}
        onChange={e => setCoupon(e.target.value)}
        className="w-32"
        disabled={loading}
      />
      <Button type="submit" size="sm" disabled={loading || !coupon.trim()}>
        Validar
      </Button>
      {couponStatus === 'valid' && (
        <span className="text-green-600 text-xs ml-2">Cupón aplicado</span>
      )}
      {couponStatus === 'invalid' && (
        <span className="text-red-600 text-xs ml-2">Cupón inválido</span>
      )}
    </form>
  );
};

export default OrderCouponInput;
