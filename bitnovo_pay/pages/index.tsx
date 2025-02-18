import CreatePayment from '@/components/CreatePayment';
import useCurrencies from '@/hooks/useCurrencies';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

const Home = () => {
  const router = useRouter();
  const { currencies, loading, error } = useCurrencies();

  if (loading) return <div className="bg-white"></div>;
  if (error) return router.push(`/error`);

  return (
    <>
      <Head>
        <title>Bitnovo pay</title>
      </Head>
      <div className="min-h-screen relative bg-gray-100 flex items-center justify-around p-4">
        <div className="w-full max-w-xl mx-auto  bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Crear Pago</h1>
          <CreatePayment currencies={currencies} />
        </div>
        <Image
          className='absolute bottom-4' 
          src="/water_mark_bitnovo.png" 
          alt="Descripción de la imagen" 
          width={400} 
          height={200} />
      </div>
    </>
  );
};

export default Home;