import { useState, useEffect } from "react";
import api from "@/services/api";
import type { PaymentInfo } from "@/types";

const usePaymentInfo = (identifier: string) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await api.get(`/orders/info/${identifier}`);
        setPaymentInfo(response.data[0]);
      } catch (err) {
        setError("Error al obtener la información del pago");
      } finally {
        setLoading(false);
      }
    };

    if (identifier) {
      fetchPaymentInfo();
    }
  },[identifier])

  return { paymentInfo, loading, error };
}

export default usePaymentInfo;