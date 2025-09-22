'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Inter } from 'next/font/google';
import Breadcrumb from '@/components/checkout/breadcrumb';
import CheckoutForm from '@/components/checkout/checkout_form';
import OrderSummary from '@/components/checkout/order-summary/order-summary';
import { calculatePricing } from '@/utils/calculatePricing';
import { useService } from '@/hooks/useServices';
import { useCreateOrder } from '@/hooks/useOrders';
import { useCoupon } from '@/hooks/useCoupons'

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idService = searchParams.get('plan');
  const { service, loading, error } = useService(idService);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [formData, setFormData] = useState({
    personalInfo: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      documento: ''
    },
    paymentInfo: {
      method: 'card',
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: '',
      installments: '1',
      docType: 'dni',
      docNumber: ''
    }
  });
  const [couponCode, setCouponCode] = useState('');
  const { coupon, loading: couponLoading, error: couponError } = useCoupon(couponCode);
  const { createOrder, order, loading: orderLoading, error: orderError } = useCreateOrder();

  // Redirigir si no hay idService
  useEffect(() => {
    if (!idService) {
      router.push('/visas-usa?error=invalid-plan');
    }
  }, [idService, router]);

  // Inicializar cantidad según el servicio
  useEffect(() => {
    if (service) {
      if (service.allowsVariableQuantity) {
        setQuantity(2);
      } else {
        setQuantity(service.fixedQuantity || 1);
      }
    }
  }, [service]);

  // Validar cupón: solo actualiza el código, el hook se encarga del resto
  const handleValidateCoupon = (code) => {
    setCouponCode(code);
  };

  // Usar la función de utils para calcular precios solo si service existe
  const pricing = service ? calculatePricing(quantity, service, coupon) : null;

  const handleQuantityChange = (newQuantity) => {
    if (!service.allowsVariableQuantity) return;
    setQuantity(newQuantity);
  };

  const handleFormDataChange = (section, field, value, index = null) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderPayload = {
      idService: service.idService,
      customerName: formData.personalInfo.nombre,
      customerLastname: formData.personalInfo.apellido,
      customerMail: formData.personalInfo.email,
      customerPhone: formData.personalInfo.telefono,
      couponCode: coupon && coupon.active ? coupon.code : null,
      requestedQuantity: quantity
    };
    try {
      const data = await createOrder(orderPayload);
      if (data && data.idOrder) {
        router.push(`/checkout/confirmation?id=${data.idOrder}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar error
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!service) return null;

  return (
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      <div className="max-w-6xl mx-auto px-4">
        <Breadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          {/* Left Column - Form (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Checkout - {service?.serviceName}
                </h1>
              </div>
              <CheckoutForm 
                service={service}
                formData={formData}
                selectedPayment={selectedPayment}
                onFormDataChange={handleFormDataChange}
                onPaymentChange={setSelectedPayment}
                onSubmit={handleSubmit}
                pricing={pricing}
              />
            </div>
          </div>
          {/* Right Column - Summary (1/3) */}
          <div className="lg:col-span-1">
            <OrderSummary 
              service={service}
              quantity={quantity}
              pricing={pricing}
              onQuantityChange={handleQuantityChange}
              couponStatus={couponError ? 'invalid' : coupon ? 'valid' : null}
              onValidateCoupon={handleValidateCoupon}
              couponLoading={couponLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;