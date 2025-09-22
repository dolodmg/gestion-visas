export function calculatePricing(quantity, service, coupon) {
  const pricePerPerson = service.pricePerPerson;
  const subtotal = quantity * pricePerPerson;
  let discount = 0;
  let discountPercentage = 0;
  let total = subtotal;
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
    discount = subtotal * (discountPercentage / 100);
    total = subtotal - discount;
  }

  return {
    subtotal,
    discount,
    discountPercentage,
    total,
    pricePerPerson,
    savings,
    savingsPercentage,
  };
}
