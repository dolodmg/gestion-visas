'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Inter } from 'next/font/google';
import Breadcrumb from '@/components/checkout/breadcrumb';
import OrderSummary from '@/components/checkout/order-summary/order-summary';
import Stepper from '@/components/checkout/stepper/stepper';
import PersonalInfoStep from '@/components/checkout/stepper/personal_info_step';
import PaymentStep from '@/components/checkout/stepper/payment_step';
import { CheckoutProvider, useCheckout } from '@/context/checkout_context';
import { calculatePricing } from '@/utils/calculatePricing';
import { useService } from '@/hooks/useServices';
import { useCoupon } from '@/hooks/useCoupons';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','700'] });

// Componente interno que usa el Context
const CheckoutPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idService = searchParams.get('plan');
  
  const { service, loading, error } = useService(idService);
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [couponTouched, setCouponTouched] = useState(false);
  const { coupon, loading: couponLoading, error: couponError } = useCoupon(couponCode);
  
  // Context del checkout
  const { currentStep, STEPS } = useCheckout();

  const isCouponValid = coupon && coupon.active && new Date(coupon.expirationDate) > new Date();

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

  const handleValidateCoupon = (code) => {
    setCouponTouched(true);
    setCouponCode(code);
  };

  const handleQuantityChange = (newQuantity) => {
    if (!service.allowsVariableQuantity) return;
    setQuantity(newQuantity);
  };

  const handlePaymentSuccess = async (payment) => {
    console.log('Pago exitoso:', payment);
     router.push(`/payment/success?payment_id=${payment.paymentId}&idOrder=${payment.idOrder}`);
  };

  const handlePaymentPending = (payment) => {
    console.log('Pago pendiente:', payment);
    const paymentId = payment?.paymentId || 'desconocido';
    const idOrder = payment?.idOrder || 'desconocido';
    router.push(`/payment/pending?payment_id=${paymentId}&idOrder=${idOrder}`);
  };
  
  const handlePaymentError = (error) => {
    console.error('Error en el pago:', error);
    const paymentId = error?.paymentId || 'desconocido';
    const idOrder = error?.idOrder || 'desconocido';
    router.push(`/payment/failure?payment_id=${paymentId}&idOrder=${idOrder}`);
  };

  // Calcular precios
  const pricing = service ? calculatePricing(quantity, service, coupon) : null;

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!service) return null;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.PERSONAL_INFO:
        return <PersonalInfoStep />;
      
      case STEPS.PAYMENT:
        return (
          <PaymentStep 
            service={{
              ...service,
              quantity,
              idService: service.idService
            }}
            pricing={pricing}
            coupon={coupon}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentPending={handlePaymentPending}
            onPaymentError={handlePaymentError}
          />
        );
      
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className={`${inter.className} bg-gray-50`}>
      <div className="max-w-6xl mx-auto px-4">
        <Breadcrumb />
        
        <div className="md:mb-6">
          <h1 className="text-md md:text-2xl font-bold text-gray-900 mb-4">
            Checkout - {service?.serviceName}
          </h1>
          <Stepper currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
          {/* Order Summary primero en mobile, a la derecha en desktop */}
          <div className="lg:col-span-1 order-1 md:order-2">
            <OrderSummary 
              service={service}
              quantity={quantity}
              pricing={pricing}
              onQuantityChange={handleQuantityChange}
              couponStatus={
                !couponTouched 
                  ? 'none'
                  : coupon && isCouponValid
                  ? 'valid'
                  : 'invalid'
              }
              onValidateCoupon={handleValidateCoupon}
              couponLoading={couponLoading}
            />
          </div>

          {/* Steps después en mobile, a la izquierda en desktop */}
          <div className="lg:col-span-2 order-2 md:order-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal que exportas 
const CheckoutPage = () => {
  return (
    <CheckoutProvider>
      <CheckoutPageContent />
    </CheckoutProvider>
  );
};

export default CheckoutPage;
