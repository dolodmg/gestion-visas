'use client';
import { createContext, useContext, useReducer, useCallback, useState } from 'react';

const CheckoutContext = createContext();

// Estados del stepper
const STEPS = {
  PERSONAL_INFO: 1,
  PAYMENT: 2,
  CONFIRMATION: 3
};

const initialState = {
  currentStep: STEPS.PERSONAL_INFO,
  personalInfo: {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento: ''
  },
  paymentData: null,
  order: null,
  loading: false,
  error: null
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_ORDER':
      return { ...state, order: action.payload };
    
    case 'SET_PAYMENT_DATA':
      return { ...state, paymentData: action.payload };
    
    case 'RESET_CHECKOUT':
      return initialState;
    
    default:
      return state;
  }
}

export function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const [includeVideocall, setIncludeVideocall] = useState(false);

  // Validaciones
  const isPersonalInfoValid = useCallback(() => {
    const { nombre, apellido, email, telefono, documento } = state.personalInfo;
    return nombre.trim() && apellido.trim() && email.trim() && telefono.trim() && documento.trim();
  }, [state.personalInfo]);

  const canGoToNextStep = useCallback(() => {
    switch (state.currentStep) {
      case STEPS.PERSONAL_INFO:
        return isPersonalInfoValid();
      case STEPS.PAYMENT:
        return true; // Siempre puede proceder al pago si llegó aquí
      default:
        return false;
    }
  }, [state.currentStep, isPersonalInfoValid]);

  // Acciones
  const nextStep = useCallback(() => {
    if (canGoToNextStep() && state.currentStep < STEPS.CONFIRMATION) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    }
  }, [canGoToNextStep, state.currentStep]);

  const prevStep = useCallback(() => {
    if (state.currentStep > STEPS.PERSONAL_INFO) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    }
  }, [state.currentStep]);

  const updatePersonalInfo = useCallback((updates) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: updates });
  }, []);


  const createOrder = useCallback(async (serviceData, couponData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const orderPayload = {
        idService: serviceData.idService,
        customerName: state.personalInfo.nombre,
        customerLastname: state.personalInfo.apellido,
        customerMail: state.personalInfo.email,
        customerPhone: state.personalInfo.telefono,
        couponCode: couponData?.active ? couponData.couponCode : null,
        requestedQuantity: serviceData.quantity,
        includeVideocall: includeVideocall 
      };

      console.log('📦 Enviando orden:', orderPayload);

      const response = await fetch(`${process.env.NEXT_PUBLIC_JAVA_BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error creando orden');
      }
      
      const orderData = await response.json();
      dispatch({ type: 'SET_ORDER', payload: orderData }); 
      
      return orderData;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.personalInfo, includeVideocall]);

const updateOrder = async (orderId, updatedData) => {
  try {
    console.log('🔄 Actualizando orden:', orderId);
    
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error actualizando orden');
    }

    const data = await response.json();
    console.log('✅ Orden actualizada:', data);
    return data;
  } catch (error) {
    console.error('❌ Error actualizando orden:', error);
    throw error;
  }
};

  const value = {
    ...state,
    STEPS,
    isPersonalInfoValid: isPersonalInfoValid(),
    canGoToNextStep: canGoToNextStep(),
    nextStep,
    prevStep,
    updatePersonalInfo,
    createOrder,
    includeVideocall,
    setIncludeVideocall,
    dispatch,
    updateOrder
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}