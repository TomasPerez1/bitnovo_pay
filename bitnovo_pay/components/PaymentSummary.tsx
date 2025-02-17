import { useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import { PaymentInfo } from '../types';

interface PaymentSummaryProps {
  paymentInfo: PaymentInfo;
  onStatusChange: (status: string) => void;
}

const PaymentSummary = ({ paymentInfo, onStatusChange }: PaymentSummaryProps) => {
  const status = useWebSocket(paymentInfo.id);

  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);

  return (
    <div className="space-y-8">
      {/* Resumen del pedido */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Importe:</p>
            <p className="text-lg font-semibold">{paymentInfo.amount} EUR</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Moneda seleccionada:</p>
            <p className="text-lg font-semibold">{paymentInfo.currency}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Comercio:</p>
            <p className="text-lg font-semibold">Comercio de pruebas de Semega</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Fecha:</p>
            <p className="text-lg font-semibold">21/01/2022 08:52</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Concepto:</p>
            <p className="text-lg font-semibold">{paymentInfo.concept}</p>
          </div>
        </div>
      </div>

      {/* Realiza el pago */}
          {/* Cantidad a enviar */}
          <div>
            <p className="text-sm text-gray-600">Enviar:</p>
            <p className="text-lg font-semibold">108.02 {paymentInfo.currency}</p>
          </div>

          {/* Dirección de pago */}
          <div>
            <p className="text-sm text-gray-600">Dirección de pago:</p>
            <p className="text-lg font-semibold break-all">{paymentInfo.address}</p>
          </div>

          {/* Etiqueta de destino */}
          <div>
            <p className="text-sm text-gray-600">Etiqueta de destino:</p>
            <p className="text-lg font-semibold">2557164061</p>
          </div>
        </div>
  );
};

export default PaymentSummary;