import CreatePayment from '@/components/CreatePayment';
import useCurrencies from '@/hooks/useCurrencies';

const Home = () => {
  const { currencies, loading, error } = useCurrencies();
  console.log(currencies)
  const handleSubmit = (order: any) => {
    console.log('Pago creado:', order);
    // Aquí manejaremos la creación del pago
  };

  if (loading) return <p className="text-center bg-green-600">Cargando criptodivisas...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[40%] mx-auto max-w-xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Pago</h1>
        <CreatePayment currencies={currencies} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;