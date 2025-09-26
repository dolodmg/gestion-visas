'use client';
import { useCurrency } from '@/hooks/useCurrency';

const OrderPriceDetails = ({ pricing, quantity, service }) => {
  const getServiceType = (serviceName) => {
    if (serviceName?.toLowerCase().includes('familiar')) return 'family';
    if (serviceName?.toLowerCase().includes('premium')) return 'premium';
    return 'standard';
  };
  const serviceType = getServiceType(service?.serviceName);

  // Hook para convertir total USD a ARS
  const { currency: totalArs, loading: arsLoading, error: arsError } = useCurrency(pricing.total);

  return (
    <div className="space-y-3 mb-6">
      {serviceType === 'family' ? (
        <>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({quantity} personas)</span>
            <span>${pricing.subtotal.toFixed(2)} USD</span>
          </div>
        </>
      ) : (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal (1 persona)</span>
          <span>${pricing.subtotal.toFixed(2)} USD </span>
        </div>
      )}
      {pricing.discount > 0 && (
            <>
              <div className="flex justify-between text-sm text-green-800">
                <span>Descuento ({Math.round(pricing.discountPercentage)}%)</span>
                <span>-${pricing.discount.toFixed(2)} USD</span>
              </div>
            </>
          )}

      <div className="border-t pt-3">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-md font-bold text-gray-900">
            <span>Total a pagar</span>
            <span>
              {arsLoading && 'Calculando...'}
              {!arsLoading && arsError && 'Error'}
              {!arsLoading && !arsError && totalArs
                ? `$${totalArs.toLocaleString('es-AR')} ARS`
                : ''}
            </span>
          </div>
          <div className="text-end text-sm text-gray-500">
            <span>(${pricing.total.toFixed(2)} USD)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPriceDetails;
