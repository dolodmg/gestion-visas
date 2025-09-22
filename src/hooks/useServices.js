import { useEffect, useState } from 'react';
import { getServicesAction, getServiceAction } from '@/server/services';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getServicesAction();
        setServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return { services, loading, error };
};

export const useService = (idService) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idService) return;
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getServiceAction(idService);
        setService(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [idService]);

  return { service, loading, error };
};