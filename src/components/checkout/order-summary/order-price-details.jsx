const OrderPriceDetails = ({ pricing, quantity, service }) => {
  // Determinar tipo de servicio por nombre
  const getServiceType = (serviceName) => {
    if (serviceName?.toLowerCase().includes('familiar')) return 'family';
    if (serviceName?.toLowerCase().includes('premium')) return 'premium';
    return 'standard';
  };
  const serviceType = getServiceType(service?.serviceName);

  return (
    <div className="space-y-3 mb-6">
      {serviceType === 'family' ? (
        <>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({quantity} personas)</span>
            <span>${pricing.subtotal.toFixed(2)} USD</span>
          </div>
          {pricing.discount > 0 && (
            <>
              <div className="flex justify-between text-sm text-green-800">
                <span>Descuento grupal ({Math.round(pricing.discountPercentage * 100)}%)</span>
                <span>-${pricing.discount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Precio por persona</span>
                <span>${pricing.pricePerPerson.toFixed(2)} USD</span>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Precio del servicio</span>
          <span>${pricing.total.toFixed(2)} USD</span>
        </div>
      )}
      <div className="border-t pt-3">
        <div className="flex justify-between text-md font-bold text-gray-900">
          <span>Total</span>
          <span>${pricing.total.toFixed(2)} USD</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPriceDetails;
