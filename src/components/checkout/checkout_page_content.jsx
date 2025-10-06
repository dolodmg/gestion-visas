'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Inter } from 'next/font/google';
import Breadcrumb from '@/components/checkout/breadcrumb';
import OrderSummary from '@/components/checkout/order-summary/order-summary';
import Stepper from '@/components/checkout/stepper/stepper';
import PersonalInfoStep from '@/components/checkout/stepper/personal_info_step';
import PaymentStep from '@/components/checkout/stepper/payment_step';
import { useCheckout } from '@/context/checkout_context';
import { calculatePricing } from '@/utils/calculatePricing';
import { useService } from '@/hooks/useServices';
import { useCoupon } from '@/hooks/useCoupons';
import CheckoutSkeleton from '@/components/checkout/checkout_skeleton';
import ErrorPage from '@/components/common/error';

const inter = Inter({ subsets: ['latin'], weight: ['400','500','700'] });

const CheckoutPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idService = searchParams.get('plan');
  
  const { service, loading, error } = useService(idService);
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [couponTouched, setCouponTouched] = useState(false);
  const [includeVideocall, setIncludeVideocall] = useState(false);
  const { coupon, loading: couponLoading, error: couponError } = useCoupon(couponCode);
  
  const { currentStep, STEPS, setCoupon: setContextCoupon } = useCheckout();

  const isCouponValid = coupon && coupon.active && new Date(coupon.expirationDate) > new Date();

  useEffect(() => {
    if (!idService) {
      return <ErrorPage 
        title="Página no encontrada"
        message="¡Ups! Parece que esta página se perdió en el camino."
        errorCode="404"
        showRefresh={false}
      />  
    }
  }, [idService]);

  useEffect(() => {
    if (service) {
      if (service.allowsVariableQuantity) {
        setQuantity(2);
      } else {
        setQuantity(service.fixedQuantity || 1);
      }
    }
  }, [service]);

  // Actualizar cupón en el contexto cuando cambia
  useEffect(() => {
    if (isCouponValid) {
      setContextCoupon(coupon);
    } else {
      setContextCoupon(null);
    }
  }, [coupon, isCouponValid, setContextCoupon]);

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

  const pricing = service ? calculatePricing(quantity, service, coupon, includeVideocall) : null;

  if (loading) return <CheckoutSkeleton />;
  if (error) return <ErrorPage 
    title="Página no encontrada"
    message="¡Ups! Parece que esta página se perdió en el camino."
    errorCode="404"
    showRefresh={false}
  />
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
            coupon={isCouponValid ? coupon : null}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 mb-2">
          <div className="lg:col-span-1 order-1 md:order-2">
            <OrderSummary 
              service={service}
              quantity={quantity}
              pricing={pricing}
              includeVideocall={includeVideocall}
              onSelectionChange={setIncludeVideocall}
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

export default CheckoutPageContent;