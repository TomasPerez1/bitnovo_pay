import { useEffect, useState } from 'react';

const useWebSocket = ({ identifier }: { identifier: string }) => {
  const [status, setStatus] = useState<string>('pending');
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("PE");
  const [shouldConnect, setShouldConnect] = useState(true);

  const terminalStatuses = ["CO", "AC", "EX", "OC"];

  useEffect(() => {
    if (!shouldConnect || terminalStatuses.includes(paymentStatus)) return;

    const newSocket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${identifier}`);

    newSocket.onopen = () => {
      console.log('Conexión WebSocket establecida');
      setStatus('connected');
      setError(null);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newStatus = data.status;
      setPaymentStatus(newStatus);
      
      if (terminalStatuses.includes(newStatus)) {
        newSocket.close();
        setShouldConnect(false);
      }
    };

    newSocket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setError('Error en la conexión');
    };

    newSocket.onclose = (event) => {
      console.log('Conexión WebSocket cerrada', event);
      setStatus('disconnected');
      
      if (!terminalStatuses.includes(paymentStatus)) {
        setTimeout(() => {
          setStatus('reconnecting');
        }, 5000);
      }
    };

    setSocket(newSocket);

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [identifier, shouldConnect, paymentStatus]);

  return { paymentStatus, error };
};

export default useWebSocket;
