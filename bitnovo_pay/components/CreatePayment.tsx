import {  useState } from 'react';
import { Currency, PaymentOrder } from '../types';
import CurrencySelector from './CurrencySelector';
import { RiInformationLine } from '@remixicon/react';
import useCreatePayment from '@/hooks/useCreatePayment';

interface PaymentFormProps {
  currencies: Currency[];
  onSubmit: (order: PaymentOrder) => void;
}

const CreatePayment = ({ onSubmit, currencies }: PaymentFormProps) => {
  const { createPayment, loading, /* error,  */data } = useCreatePayment();
  const [selectedCrypto, setSelectedCrypto] = useState<Currency>(currencies[0]);
  const [amount, setAmount] = useState<string>("")
  const [formData, setFormData] = useState<{ amount: number; concept: string; }>({
    amount: 0,
    concept: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9.]/g, ""); // Permitir solo números y punto
    
    if (inputValue === "") {
      setAmount("0.00");
      return;
    }

    
    let formattedValue = parseFloat(inputValue).toFixed(2);
    console.log("formattedValue", formattedValue);
    setAmount(inputValue);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!formData.amount || !formData.concept ) {
    //   setError('Todos los campos son obligatorios');
    //   return;
    // }

    try {
      // Crear el pago usando el hook useCreatePayment
      const paymentResult = await createPayment({amount: parseFloat(amount), concept: formData.concept, currency: selectedCrypto.symbol});

      // Manejar la respuesta (puedes redirigir a otra pantalla o mostrar un mensaje)
      console.log("Pago creado:", paymentResult);
      // setFormError(null); // Limpiar errores
    } catch (err) {
      // setFormError("Error al crear el pago");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Importe a pagar
          </label>
          <div className="mt-1">
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
              placeholder="Añade importe a pagar"
            />
          </div>
        </div>
    
        <div>
          <label htmlFor="currency" className="text-sm font-medium flex gap-1 text-center">
            Seleccionar moneda <RiInformationLine className='w-5 text-gray-600'/>
          </label>
          <div className="mt-1">
            <CurrencySelector
              currencies={currencies}
              selectedCrypto={selectedCrypto}
              setSelectedCrypto={setSelectedCrypto}
            />
          </div>
        </div>

        <div>
          <label htmlFor="concept" className="block text-sm font-medium ">
            Concepto
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="concept"
              value={formData.concept}
              onChange={(e) => setFormData((prev) => { return { ...prev, concept: e.target.value }})}
              className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
              placeholder="Añade descripción del pago"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div>
          <button
            type="submit"
            // disabled={Boolean(error) && true}
            className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-30 disabled:pointer-events-none focus:ring-2 focus:ring-blue-500"
          >
            Continuar
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePayment;