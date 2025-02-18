import { PaymentInfo } from '../types';
import { useState, useRef } from 'react';
import { Button } from '@heroui/react';
import CountdownTimer from './CountdownTimer';
import QRCode from './QrCode';
import MetaMaskButton from './MetaMaskButton';


const PaymentGateway = ({ paymentInfo }: { paymentInfo: PaymentInfo }) => {
  const [paymentMethod, setPaymentMethod] = useState<'QR' | 'META'>('QR');
  const addressRef = useRef<HTMLParagraphElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Realiza el pago</h2>
      <section className="bg-white rounded-xl shadow-lg flex flex-col items-center gap-4 py-10">
        <CountdownTimer targetDate={paymentInfo.expired_time} />

        <div className="flex gap-4">
          <Button
            className={`w-fit ${paymentMethod === 'QR' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-primary'}`}
            onPress={() => setPaymentMethod('QR')}
          >
            Smart QR
          </Button>

          <Button
            className={`w-fit ${paymentMethod === 'META' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-primary'}`}
            onPress={() => setPaymentMethod('META')}
          >
            Web3
          </Button>
        </div>

        {paymentMethod === 'QR' && (
            <QRCode
              adress={paymentInfo.address}
              tag_memo={paymentInfo.tag_memo}
              crypto_amount={paymentInfo.crypto_amount}
              concept={paymentInfo.notes}
              currency={paymentInfo.currency_id}
            />
        )}

        {paymentMethod === 'META' && (
          <MetaMaskButton
            paymentInfo={paymentInfo}
          />
        )}

        <div className="text-primary flex items-center gap-2">
          <p className="text-base  font-medium">Enviar</p>
          <p className="text-lg font-semibold">
            {paymentInfo.crypto_amount} {paymentInfo.currency_id.replaceAll('_', ' ')}
          </p>
          <img
            src="/Copy.svg"
            alt="Copiar"
            className="w-5 text-blue-600 cursor-pointer"
            onClick={() => copyToClipboard(paymentInfo.crypto_amount.toString())}
          />
        </div>

        <div className="flex relative items-center gap-2 justify-center ">
          <p ref={addressRef} className="w-[80%]   mx-auto break-words text-base text-primary text-center">
            {paymentInfo.address}
          </p>
          <div className="cursor-pointer absolute top-1 right-2" onClick={() => copyToClipboard(paymentInfo.address)}>
            <img
              src="/Copy.svg"
              alt="Copiar"
              className="w-5 text-blue-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <img src="/warning-2.svg" alt="Advertencia" className="w-5 text-yellow-400/50" />
          <p className="text-sm text-gray-600">Etiqueta de destino:</p>
          <p className="text-sm font-semibold">{paymentInfo.tag_memo || "no disponible"}</p>
          <img
            src="/Copy.svg"
            alt="Copiar"
            className="w-5 text-blue-600 cursor-pointer"
            onClick={() => copyToClipboard(paymentInfo.tag_memo)}
          />
        </div>
      </section>
    </div>
  );
};

export default PaymentGateway;

