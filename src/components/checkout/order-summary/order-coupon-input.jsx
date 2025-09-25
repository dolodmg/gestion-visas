import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const OrderCouponInput = ({ onValidateCoupon, couponStatus, loading }) => {
  const [coupon, setCoupon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coupon.trim()) {
      onValidateCoupon(coupon.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${inter.className} flex mb-4`}>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-2'>
          <Input
            type="text"
            placeholder="Ingresá tu cupón"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            className="lg:w-3/2"
            disabled={loading}
          />
          <Button 
          className="bg-slate-700 hover:cursor-pointer hover:bg-slate-800"
          type="submit" size="sm" disabled={loading || !coupon.trim()}>
            Validar
          </Button>
        </div>
        <div className='flex flex-row mt-2'>
          {couponStatus === 'valid' && (
          <span className="text-green-600 text-xs">¡Cupón aplicado!</span>
        )}
        {couponStatus === 'invalid' && (
          <span className="text-red-600 text-xs">Cupón inválido</span>
        )}
        </div>
      </div>
    </form>
  );
};

export default OrderCouponInput;
