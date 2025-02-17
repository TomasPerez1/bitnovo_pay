import { PaymentInfo } from '../types';
import { useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';

interface PaymentSummaryProps {
  paymentInfo: PaymentInfo;
  onStatusChange: (status: string) => void;
}


const PaymentGateway = ({ paymentInfo, onStatusChange }: PaymentSummaryProps) => {
  const status = useWebSocket(paymentInfo.id);

  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Realiza el pago</h2>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Oscas</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Smart QR</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Web3</span>
          </label>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">Estado:</p>
        <p className="text-lg font-semibold">
          {status === 'pending' && 'Pendiente'}
          {status === 'AC' && 'Aceptado'}
          {status === 'CO' && 'Completado'}
          {status === 'EX' && 'Expirado'}
          {status === 'OC' && 'Cancelado'}
        </p>
      </div>
       {/* Realiza el pago */}
          {/* Cantidad a enviar */}
          {/* <div>
            <p className="text-sm text-gray-600">Enviar:</p>
            <p className="text-lg font-semibold">108.02 {paymentInfo.currency}</p>
          </div> */}

          {/* Dirección de pago */}
          {/* <div>
            <p className="text-sm text-gray-600">Dirección de pago:</p>
            <p className="text-lg font-semibold break-all">{paymentInfo.address}</p>
          </div> */}

          {/* Etiqueta de destino */}
          {/* <div>
            <p className="text-sm text-gray-600">Etiqueta de destino:</p>
            <p className="text-lg font-semibold">2557164061</p>
          </div> */}
    </div>
  )
}

export default PaymentGateway