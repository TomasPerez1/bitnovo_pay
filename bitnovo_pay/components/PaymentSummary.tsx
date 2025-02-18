import Image from 'next/image';
import { Currency, PaymentInfo } from '../types';
import { RiVerifiedBadgeFill } from '@remixicon/react';

interface PaymentSummaryProps {
  paymentInfo: PaymentInfo;
  currencies: Currency[];
}

const PaymentSummary = ({ paymentInfo, currencies }: PaymentSummaryProps) => {
  const selectedCrypto = currencies.find(crypto => crypto.symbol === paymentInfo.currency_id)


  return (
    <div className=" w-full ">
      <div className="p-6 text-primary font-semibold">
        <h2 className="text-lg text-primary font-semibold mb-4">Resumen del pedido</h2>

        <div className="p-2 rounded-xl shadow-lg bg-gray-200">
          <div className='flex justify-between p-3 border-b-1 border-gray-400'>
            <p className="text-base">Importe:</p>
            <p className="text-base font-semibold">{paymentInfo.fiat_amount.toFixed(2)} EUR</p>
          </div>

          <div className='flex justify-between p-3 border-b-1 border-gray-400 items-center'>
            <p className="text-base ">Moneda seleccionada:</p>
            <span className='flex items-center  p-0'>
              <Image 
              className="p-2 rounded-xl" 
              width={50} 
              height={50} 
              alt={selectedCrypto?.name || "crypto_img"} 
              src={selectedCrypto?.image || "/"}/>
              <p className="text-lg font-semibold">{paymentInfo.currency_id.replaceAll("_", " ")}</p>
            </span>
          </div>

          <div className='flex justify-between p-3'>
            <p className="text-base ">Comercio:</p>
            <span className='flex  items-center gap-1.5'>
              <RiVerifiedBadgeFill className='w-5 text-blue-300'/> 
              <p className="text-base font-medium">Comercio de pruebas de Semega</p>
            </span>
          </div>

          <div className='flex justify-between p-3 border-b-1 border-gray-400'>
            <p className="text-base ">Fecha:</p>
            <p className="text-base font-medium">
              {new Date(paymentInfo.created_at).toLocaleString('es-AR', { 
                timeZone: 'America/Argentina/Buenos_Aires', 
                hour: 'numeric', 
                minute: 'numeric', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }).replace(",", " ")}
            </p>
          </div>

          <div className='flex justify-between p-3 '>
            <p className="text-base ">Concepto:</p>
            <p className="text-base font-medium">{paymentInfo.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;