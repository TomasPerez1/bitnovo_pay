import { useState } from "react";
import api from "@/services/api";

const useCreatePayment = () => {
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [data, setData] = useState<any>(null); // Estado para almacenar la respuesta de la API


  const createPayment = async ({amount, concept, currency/* , frontDni, backDni */}: {amount: string, concept: string, currency: string/* , frontDni: File, backDni: File */}) => {
    setLoading(true);
    setError(null);

    try {
      // Llamada al endpoint POST /orders
      console.log("se recibio", {amount, concept, currency})
      const formData = new FormData();
      formData.append("expected_output_amount", `${amount}`);
      formData.append("input_currency", "BCH_TEST");
      // formData.append("front_dni", frontDni);
      // formData.append("back_dni", backDni);

      const response = await api.post("/orders/", formData);

      // Guardar la respuesta de la API
      setData(response.data);
      return response.data; // Retornar la respuesta para su uso externo
    } catch (err) {
      setError("Error al crear el pago");
      throw err; // Lanzar el error para que pueda ser manejado externamente
    } finally {
      setLoading(false);
    }
  };

  return { createPayment, loading, error, data };
};

export default useCreatePayment;


// import { useState, useEffect } from 'react';
// import api from '@/services/api'; 

// const useCreatePayment = ({}) => {
//   const [paymentStatus, setPaymentStatus] = useState<any>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

  
//   useEffect(() => {
//     const createPayment = async () => {
//       try {
//         // Llamada a la API para obtener las criptodivisas
//         const response = await api.post<any>('/orders', );
        
//         console.log("response", response)
//         if (response.status === 200) {
//           setPaymentStatus(response.data); // Guardar las criptodivisas en el estado
//         } else {
//           throw new Error('Error al obtener las criptodivisas');
//         }
//       } catch (err) {
//         setError('Error al cargar las criptodivisas');
//       } finally {
//         setLoading(false);
//       }
//     };
//     createPayment();
//   }, []);

//   return { paymentStatus, loading, error };
// };

// export default useCreatePayment;