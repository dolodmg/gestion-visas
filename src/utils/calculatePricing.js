export function calculatePricing(quantity, service, coupon, includeVideocall = false) {
   const VIDEOCALL_PRICE = 10.00;
  const pricePerPerson = service.pricePerPerson;
  const subtotal = quantity * pricePerPerson;
  const subtotalWithAddons = subtotal + (includeVideocall ? VIDEOCALL_PRICE : 0);
  let discount = 0;
  let discountPercentage = 0;
  let total = subtotalWithAddons; 
  let savings = 0;
  let savingsPercentage = 0;

  // Detectar si es familiar
  const isFamily = service.serviceName?.toLowerCase().includes('familiar');

  // Si es familiar, mostrar ahorro comparado con estándar
  if (isFamily) {
    // El precio estándar es 100, el familiar es 75
    const standardPrice = 100;
    savings = quantity * (standardPrice - pricePerPerson);
    savingsPercentage = 0.2; // 20%
  }

  // Aplicar cupón en cualquier tipo de servicio
  if (coupon && coupon.active) {
    discountPercentage = coupon.discount;
    discount = subtotalWithAddons * (discountPercentage / 100);
    total = subtotalWithAddons - discount;
  }

  return {
    subtotal,
    videocallPrice: includeVideocall ? VIDEOCALL_PRICE : 0,
    discount,
    discountPercentage,
    total,
    pricePerPerson,
    savings,
    savingsPercentage,
    includeVideocall
  };
}
