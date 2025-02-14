import { useEffect, useState } from 'react';

const useWebSocket = (identifier: string) => {
  const [status, setStatus] = useState<string>('pending');

  useEffect(() => {
    const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${identifier}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
    };

    return () => {
      socket.close();
    };
  }, [identifier]);

  return status;
};

export default useWebSocket;