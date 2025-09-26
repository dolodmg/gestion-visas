const processPaymentWithOrder = async (formData, orderData, service, pricing) => {
  const paymentEmail = formData.payer?.email || formData.payerEmail;
  if (!paymentEmail) throw new Error('Email requerido para el pago');

  if (!formData.payment_method_id || formData.payment_method_id === 'account_money' || !formData.token) {
    const preferenceData = {
      totalPrice: pricing.total,
      description: service.serviceName,
      quantity: service.quantity || 1,
      customerMail: paymentEmail,
      customerName: formData.payerName,
      externalReference: orderData.externalReference
    };

    const response = await fetch('http://localhost:8080/api/mercadopago/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferenceData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error creando preferencia');
    window.location.href = data.checkoutUrl || data.sandboxUrl;
    return data;
  } else {
    const paymentFormData = {
      token: formData.token,
      email: paymentEmail,
      installments: formData.installments || 1,
      payment_method_id: formData.payment_method_id,
      issuer_id: formData.issuer_id,
      transaction_amount: formData.transaction_amount || pricing.total,
      identification_type: formData.payer?.identification?.type,
      identification_number: formData.payer?.identification?.number,
      first_name: formData.payerName?.split(' ')[0] || ''
    };

    const mpResponse = await fetch('http://localhost:8080/api/mercadopago/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: pricing.total, 
        description: service.serviceName, 
        externalReference: orderData.externalReference,
        formData: paymentFormData
      })
    });

    const result = await mpResponse.json();
    if (!mpResponse.ok) throw new Error(result.error || 'Error procesando el pago');
    return result;
  }
};

export default processPaymentWithOrder;
