import { useCurrency } from '@/hooks/useCurrency';

const SummaryOrder = ({ service, pricing, coupon }) => {
  const { currency: totalArs, loading, error } = useCurrency(pricing.total);

  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Resumen del pedido</h3>
      <div className="flex justify-between items-center">
        { service?.quantity > 1 ? 
        <div className='text-sm'>
          <span className='font-medium text-zinc-700'>{service?.serviceName}</span>
          <span className='font-bold text-blue-900'> (x{service?.quantity} personas)</span>
        </div>
      : (
        <span className='text-sm font-medium text-zinc-700'>{service?.serviceName}</span>
      )}
        <span className="font-semibold text-zinc-900">
          {loading && 'Calculando...'}
          {!loading && error && 'Error'}
          {!loading && !error && totalArs
            ? `$${totalArs.toLocaleString('es-AR')} ARS`
            : ''}
        </span>
      </div>
      {coupon && coupon.active && (
        <div className="flex justify-between items-center text-green-600 font-medium text-sm mt-1">
          <span>Cupón: {coupon.code}</span>
          <span>- {coupon.discount}%</span>
        </div>
      )}
    </div>
  );
};

export default SummaryOrder;
