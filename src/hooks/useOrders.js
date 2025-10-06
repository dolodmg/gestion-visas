import { useEffect, useState } from 'react';
import { getOrderAction, createOrderAction, updateOrderAction } from '@/server/orders';

export const useOrder = (idOrder) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrder) return;
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOrderAction(idOrder);
        setOrder(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [idOrder]);

  return { order, loading, error };
};

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createOrderAction(orderData);
      setOrder(data);
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, order, loading, error };
};

export const useUpdateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOrder = async (idOrder, orderData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateOrderAction(idOrder, orderData);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateOrder, loading, error };
};