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
    </div>
  )
}

export default PaymentGateway