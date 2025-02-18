import CreatePayment from '@/components/CreatePayment';
import useCurrencies from '@/hooks/useCurrencies';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { currencies, loading, error } = useCurrencies();

  if (loading) return <div className="bg-white"></div>;
  if (error) return router.push(`/error`);

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl mx-auto  bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Pago</h1>
        <CreatePayment currencies={currencies} />
      </div>
    </div>
  );
};

export default Home;