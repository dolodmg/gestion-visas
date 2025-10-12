import OrderHeader from './order-header';
import OrderQuantitySelector from './order-quantity-selector';
import OrderPriceDetails from './order-price-details';
import OrderCouponInput from './order-coupon-input';
import VideocallAddon from './video_call_option';

const getServiceType = (serviceName) => {
  if (serviceName?.toLowerCase().includes('familiar')) return 'family';
  if (serviceName?.toLowerCase().includes('premium')) return 'premium';
  return 'standard';
};

const OrderSummary = ({ 
  service, 
  quantity, 
  pricing, 
  includeVideocall,      
  onSelectionChange,
  onQuantityChange, 
  couponStatus, 
  onValidateCoupon, 
  couponLoading,
  imageConfig
 }) => {
  if (!service || !pricing) {
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm sticky top-4 lg:top-8 text-center text-gray-400">
        <div className="mb-2 font-semibold">Resumen de orden</div>
        <div className="text-sm">Cargando información del servicio...</div>
      </div>
    );
  }

  const serviceType = getServiceType(service?.serviceName);
  const color = serviceType === 'family' ? 'green' : serviceType === 'premium' ? 'yellow' : 'blue';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm sticky md:top-8 mb-2">
      {/* Header */}
      <OrderHeader serviceName={service.serviceName} color={color} imageConfig={imageConfig} />

      {/* Selector de cantidad */}
      {service.allowsVariableQuantity && (
        <OrderQuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          allowsVariableQuantity={service.allowsVariableQuantity}
          min={service.minQuantity || 2}
          max={service.maxQuantity || 10}
        />
      )}
      {/*Checkbox de videollamada */}
      {serviceType === 'family' && (
        <div className="mb-4">
          <VideocallAddon 
            isSelected={includeVideocall} 
            onSelectionChange={onSelectionChange}
          />
        </div> 
      )}

      {/* Input de cupón */}
      <OrderCouponInput
        onValidateCoupon={onValidateCoupon}
        couponStatus={couponStatus}
        loading={couponLoading}
      />

      {/* Precios */}
      <OrderPriceDetails pricing={pricing} quantity={quantity} service={service}  />

      {/* Info adicional para familiar */}
      {serviceType === 'family' && (
        <div className="text-xs text-green-700 text-center mt-2">
          Ahorrás un 20% en el pack familiar
        </div>
      )}
    </div>
  );
}

export default OrderSummary;