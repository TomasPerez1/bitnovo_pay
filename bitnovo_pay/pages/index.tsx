import type { Currency } from '@/types';
import { useState } from 'react';
import PaymentForm from "../components/PaymentForm"

const Home = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  return (
    <div>
      <h1>Crear Pago</h1>
      <PaymentForm currencies={currencies} />
    </div>
  );
};

export default Home;