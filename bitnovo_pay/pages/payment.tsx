
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PaymentSummary from '../components/PaymentSummary';
import PaymentGateway from '@/components/PaymentGateway';
import usePaymentInfo from '@/hooks/usePaymentInfo';
import useCurrencies from '@/hooks/useCurrencies';
import useWebSocket from '@/hooks/useWebSocket';

const Payment = () => {
  const router = useRouter();
  const { identifier } = router.query;
  const { currencies } = useCurrencies();
  const { paymentInfo, loading, error } = usePaymentInfo(`${identifier}`);
  const { paymentStatus, error: wsError } = useWebSocket({ identifier: `${identifier}` });
  const [redirected, setRedirected] = useState(false);

  if (["CO", "AC"].includes(`${paymentInfo?.status}`)) {
      router.push("/success");
  } 
  else if (["EX", "OC"].includes(`${paymentInfo?.status}`)) {
      router.push("/error");
  }

  useEffect(() => {
    console.log("PAYMENT STATUS", paymentStatus)
    if (redirected) return;
        
    if (["CO", "AC"].includes(paymentStatus)) {
      router.push("/success");
      setRedirected(true);
    } else if (["EX", "OC"].includes(paymentStatus)) {
      router.push("/error");
      setRedirected(true);
    }
  }, [paymentStatus, paymentInfo?.status, redirected]);

  if (loading) return <div className="bg-white"></div>;
  if (error || wsError) return <p className="text-center text-red-600">{error || wsError}</p>;
  if (!paymentInfo) return <p className="text-center">No se encontró información del pago.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[90%] gap-2 grid grid-cols-2 p-8 rounded-lg">
        <PaymentSummary paymentInfo={paymentInfo} currencies={currencies} />
        <PaymentGateway paymentInfo={paymentInfo} />
      </div>
    </div>
  );
};

export default Payment;

