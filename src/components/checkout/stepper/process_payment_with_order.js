const processPaymentWithOrder = async (formData, orderData, service, pricing) => {
  const paymentEmail = formData.payer?.email || formData.payerEmail;
  if (!paymentEmail) throw new Error('Email requerido para el pago');

  const enrichedFormData = {
    ...formData,
    externalReference: orderData.externalReference
  };

  // Método de redirección (Mercado Pago Wallet, efectivo, etc.)
  if (!enrichedFormData.payment_method_id || 
      enrichedFormData.payment_method_id === 'account_money' || 
      !enrichedFormData.token) {
    
    console.log('🔄 Método de redirección - creando preference...');
    
    const preferenceData = {
      totalPrice: pricing.total,
      description: service.serviceName,
      quantity: service.quantity || 1,
      customerMail: paymentEmail,
      customerName: enrichedFormData.payerName,
      externalReference: orderData.externalReference
    };

    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferenceData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error creando preferencia');
    
    // Redirigir a Mercado Pago
    window.location.href = data.checkoutUrl || data.sandboxUrl;
    return data;
  } 
  
  // Método con token (tarjetas de crédito/débito)
  else {
  
    const paymentFormData = {
      token: enrichedFormData.token,
      email: paymentEmail,
      installments: enrichedFormData.installments || 1,
      payment_method_id: enrichedFormData.payment_method_id,
      issuer_id: enrichedFormData.issuer_id,
      transaction_amount: enrichedFormData.transaction_amount || pricing.total,
      identification_type: enrichedFormData.payer?.identification?.type,
      identification_number: enrichedFormData.payer?.identification?.number,
      first_name: enrichedFormData.payerName?.split(' ')[0] || ''
    };

    const mpResponse = await fetch('/api/mercadopago/process-payment', {
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
    console.log(mpResponse);
    if (!mpResponse.ok) throw new Error(result.error || 'Error procesando el pago');
    
    return {
      paymentId: result.id,
      idOrder: orderData.idOrder,
      status: result.status
    };
  }
};

export default processPaymentWithOrder;