import { useRouter } from 'next/router';
import PaymentSummary from '../components/PaymentSummary';
import PaymentGateway from '@/components/PaymentGateway';
import usePaymentInfo from '@/hooks/usePaymentInfo';
import useCurrencies from '@/hooks/useCurrencies';
import api from '../services/api';


const PaymentPage = () => {
  const router = useRouter();
  const { identifier } = router.query;
  const { currencies } = useCurrencies()
  const { paymentInfo, loading, error } = usePaymentInfo(`${identifier}`)


  if (loading) return <p className="text-center">Cargando información del pago...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!paymentInfo) return <p className="text-center">No se encontró información del pago.</p>;
  console.log("paymentInfo", paymentInfo)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[90%] gap-2 grid grid-cols-2  p-8 rounded-lg ">
        <PaymentSummary paymentInfo={paymentInfo} currencies={currencies} onStatusChange={() => {} } />
        <PaymentGateway paymentInfo={paymentInfo} onStatusChange={() => {} } />
      </div>
    </div>
  );
};

export default PaymentPage;