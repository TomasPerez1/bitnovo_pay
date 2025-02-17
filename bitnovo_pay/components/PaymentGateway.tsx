import { PaymentInfo } from '../types';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { RiFileCopyLine, RiInformationFill } from '@remixicon/react';
import QRCode from './QrCode';
import useWebSocket from '../hooks/useWebSocket';
import CountdownTimer from './CountdownTimer';

interface PaymentSummaryProps {
  paymentInfo: PaymentInfo;
  onStatusChange: (status: string) => void;
}


const PaymentGateway = ({ paymentInfo, onStatusChange }: PaymentSummaryProps) => {
  console.log(paymentInfo)
  const status = useWebSocket(paymentInfo.identifier);
  const [paymentMethod, setPaymentMethod] = useState<"QR" | "META">("QR")

  useEffect(() => {
    onStatusChange(status);
    console.log("status", status)
  }, [status, onStatusChange]);

  const CopyToClipboard = (ref: any) => {
    const text = ref.current.textContent;
    navigator.clipboard.writeText(text)
  };

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Realiza el pago</h2>
      <section className='bg-white rounded-xl shadow-lg flex flex-col items-center gap-4 py-10'>

        <CountdownTimer targetDate={paymentInfo.expired_time}/>

          <div className="flex gap-4">
            <Button className={`w-fit ${paymentMethod === "QR" ? "bg-blue-600 text-white " : "bg-gray-300 text-primary" }`}>
              Smart QR
            </Button>
            
            <Button className={`w-fit ${paymentMethod === "META" ? "bg-blue-600 text-white " : "bg-gray-300 text-primary" }`}>
              Web3
            </Button>
          </div>

          <QRCode 
            adress={paymentInfo.address} 
            tag_memo={paymentInfo.tag_memo}
            crypto_amount={paymentInfo.crypto_amount}
            concept={paymentInfo.notes}
            currency={paymentInfo.currency_id}
          />
        
          <div className=' text-primary flex items-center gap-2'>
            <p className="text-md font-medium">Enviar </p>
            <p className="text-lg font-semibold">{paymentInfo.crypto_amount} {paymentInfo.currency_id.replaceAll("_", " ")}</p>
            <RiFileCopyLine className='w-5 text-blue-600'/>
          </div>

          <div className='flex items-center gap-0  justify-around'>
            <p className="w-[72%] mx-auto break-words text-lg text-ptrimary text-center ">{paymentInfo.address}</p>
            <p className='border border-black'><RiFileCopyLine className='w-5 text-blue-600 mr-auto'/></p>
          </div>
          

          {/* Etiqueta de destino */}
          <div className='flex items-center gap-1.5'>
            <RiInformationFill className='w-5 text-yellow-400/50'/>
            <p className="text-sm text-gray-600">Etiqueta de destino:</p>
            <p className="text-sm font-semibold">{paymentInfo.identifier}</p>
          </div>
      </section>
    </div>
  )
}

export default PaymentGateway


  {/* <div className="text-center">
            <p className="text-sm text-gray-600">Estado:</p>
            <p className="text-lg font-semibold">
              {status === 'pending' && 'Pendiente'}
              {status === 'AC' && 'Aceptado'}
              {status === 'CO' && 'Completado'}
              {status === 'EX' && 'Expirado'}
              {status === 'OC' && 'Cancelado'}
            </p>
          </div> */}