import {  useState } from 'react';
import { useRouter } from 'next/router';
import { Currency } from '../types';
import { RiInformationLine } from '@remixicon/react';
import CurrencySelector from './CurrencySelector';
import useCreatePayment from '@/hooks/useCreatePayment';
import { Button } from '@heroui/react';


const CreatePayment = ({ currencies }: {currencies: Currency[]}) => {
  const router = useRouter();
  const { createPayment, loading, /* error,  */} = useCreatePayment();
  const [selectedCrypto, setSelectedCrypto] = useState<Currency>(currencies[0]);
  const [amount, setAmount] = useState<string>("")
  const [concept, setConcept] = useState<string>("");
  const [error, setError] = useState<string>("default");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("default")
    let inputValue = e.target.value.replace(/[^0-9.]/g, "");
    // let formattedValue = parseFloat(inputValue).toFixed(2);
    setAmount(inputValue);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {min_amount, max_amount} = selectedCrypto;

    if (parseFloat(amount) < parseFloat(min_amount)) {
      setError(`El importe mínimo es ${min_amount}`);
      return;
    }
    if (parseFloat(amount) > parseFloat(max_amount)) {
      setError(`El importe maximo es ${max_amount}`);
      return;
    }
    

    try {
      const paymentResult = await createPayment({amount, concept, currency: selectedCrypto.symbol});

      console.log("Pago creado:", paymentResult);
      router.push(`/payment?identifier=${paymentResult.identifier}`);
    } catch (err) {
      console.log(err)
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className='mb-2'>
          <label htmlFor="amount" className="block text-sm font-semibold">
            Importe a pagar
          </label>
          <div className="mt-1">
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full text-primary  px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
              placeholder="Añade importe a pagar"
            />
            <p className={`text-sm ml-2  ${error !== "default" ? "visible text-red-600" : "invisible"}`}>
              {error}
            </p>
          </div>
        </div>
    
        <div className='mb-6'>
          <label htmlFor="currency" className="text-sm font-semibold flex gap-1 items-center">
            Seleccionar moneda <RiInformationLine className='w-4 text-gray-600'/>
          </label>
          <div onClick={() => setError("default")} className="mt-1">
            <CurrencySelector
              currencies={currencies}
              selectedCrypto={selectedCrypto}
              setSelectedCrypto={setSelectedCrypto}
            />
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor="concept" className="block text-sm font-semibold ">
            Concepto
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="concept"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
              placeholder="Añade descripción del pago"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            isLoading={loading}
            disabled={error !== "default" || !amount || !concept && true}
            className="w-full px-4 py-6 text-base text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-30 disabled:pointer-events-none"
          >
            Continuar
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePayment;