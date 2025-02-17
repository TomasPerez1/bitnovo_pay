import { PaymentInfo } from '../types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PaymentSummary from '../components/PaymentSummary';
import PaymentGateway from '@/components/PaymentGateway';
import usePaymentInfo from '@/hooks/usePaymentInfo';
import api from '../services/api';

const PaymentPage = () => {
  const router = useRouter();
  const { identifier } = router.query;
  const { paymentInfo, loading, error } = usePaymentInfo(`${identifier}`)
  

  // const handleStatusChange = (status: string) => {
  //   if (status === 'CO' || status === 'AC') {
  //     router.push('/success');
  //   } else if (status === 'EX' || status === 'OC') {
  //     router.push('/error');
  //   }
  // };

  if (loading) return <p className="text-center">Cargando información del pago...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!paymentInfo) return <p className="text-center">No se encontró información del pago.</p>;
  console.log("paymentInfo", paymentInfo)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[80%] gap-2  flex  bg-white p-8 rounded-lg shadow-md">
        <PaymentSummary paymentInfo={paymentInfo} onStatusChange={() => {} } />
        <PaymentGateway paymentInfo={paymentInfo} onStatusChange={() => {} } />
      </div>
    </div>
  );
};

export default PaymentPage;