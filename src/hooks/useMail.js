import { useState } from 'react';
import { sendContactEmailAction } from '@/server/mails';

export const useSendMail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const sendMail = async (contact) => {
    setLoading(true);
    setError(null);
    try {
      const data = await sendContactEmailAction(contact);
      setEmail(data);
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMail, email, loading, error };
};