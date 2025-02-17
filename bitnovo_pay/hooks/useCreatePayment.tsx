import { useState } from "react";
import api from "@/services/api";

const useCreatePayment = () => {
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [data, setData] = useState<any>(null); // Estado para almacenar la respuesta de la API


  const createPayment = async ({amount, concept, currency}: {amount: string, concept: string, currency: string/* , frontDni: File, backDni: File */}) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("expected_output_amount", `${amount}`);
      formData.append("input_currency", currency);
      formData.append("notes", concept);

      const response = await api.post("/orders/", formData);

      setData(response.data);
      return response.data; 
    } catch (err) {
      setError("Error al crear el pago");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { createPayment, loading, error, data };
};

export default useCreatePayment;
