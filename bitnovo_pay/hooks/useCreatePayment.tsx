import { useState, useEffect } from 'react';
import api from '@/services/api'; 

const useCreatePayment = ({}) => {
  const [paymentStatus, setPaymentStatus] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const createPayment = async () => {
      try {
        // Llamada a la API para obtener las criptodivisas
        const response = await api.post<any>('/orders', );
        
        console.log("response", response)
        if (response.status === 200) {
          setPaymentStatus(response.data); // Guardar las criptodivisas en el estado
        } else {
          throw new Error('Error al obtener las criptodivisas');
        }
      } catch (err) {
        setError('Error al cargar las criptodivisas');
      } finally {
        setLoading(false);
      }
    };
    createPayment();
  }, []);

  return { paymentStatus, loading, error };
};

export default useCreatePayment;