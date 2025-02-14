import { useState, useEffect } from 'react';
import type { Currency } from '@/types';
import api from '@/services/api'; 

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const getCurrencies = async () => {
      try {
        // Llamada a la API para obtener las criptodivisas
        const response = await api.get<Currency[]>('/currencies');
        
        // Verificar si la respuesta es exitosa
        if (response.status === 200) {
          setCurrencies(response.data); // Guardar las criptodivisas en el estado
        } else {
          throw new Error('Error al obtener las criptodivisas');
        }
      } catch (err) {
        setError('Error al cargar las criptodivisas');
      } finally {
        setLoading(false);
      }
    };
    getCurrencies();
  }, []);

  return { currencies, loading, error };
};

export default useCurrencies;