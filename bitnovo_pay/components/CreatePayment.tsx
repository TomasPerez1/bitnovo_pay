import { useEffect, useState } from 'react';
import { Currency, PaymentOrder } from '../types';
import CurrencySelector from './CurrencySelector';
import useCurrencies from '@/hooks/useCurrencies';
import Modal from './Modal';

interface PaymentFormProps {
  currencies: Currency[];
  onSubmit: (order: PaymentOrder) => void;
}

const CreatePayment = ({ onSubmit }: PaymentFormProps) => {
  const { currencies } = useCurrencies();
  console.log("PRIMEROO", currencies[0])
  const defaultCurrency = {
    symbol: "DEFAULT",
    name: "Bitcoin DEFAULTTT  BCd",
    image: "https://payments.pre-bnvo.com/media/crytocurrencies/CryptoBCH_Size36_px_TT7Td9Q.png",
    minAmount: 0,
    maxAmount: 0,
    blockchain: "default"
  }
  const [formData, setFormData] = useState<{ amount: number; concept: string; currency: Currency }>({
    amount: 0,
    concept: '',
    currency: defaultCurrency,
  });

  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(currencies && currencies.length) {
      console.log("AQUI LOS CURRENCIESS", currencies)
      setFormData((prev) => { return {...prev, currency: currencies[0]} })
    }
  }, [currencies])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.concept || !formData.currency) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // const selectedCurrency = currencies.find((c) => c.symbol === formData.currency);
    // if (selectedCurrency && (formData.amount < selectedCurrency.minAmount || formData.amount > selectedCurrency.maxAmount)) {
    //   setError(`El importe debe estar entre ${selectedCurrency.minAmount} y ${selectedCurrency.maxAmount}`);
    //   return;
    // }

    // setError(null);
    // onSubmit(formData);
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
              type="number"
              id="amount"
              // value={formData.amount}
              defaultValue={""}
              onChange={(e) => setFormData((prev) => { return { ...prev, amount: parseFloat(e.target.value) }})}
              className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
              placeholder="Añade importe a pagar"
            />
          </div>
        </div>
    
        <div>
          <label htmlFor="currency" className="block text-sm font-medium ">
{/*           // TODO agregar info tooltip
 */}            Seleccionar moneda
          </label>
          <div className="mt-1">
            <CurrencySelector/>
            {/* <CurrencySelector currencies={currencies} currency={formData.currency} setFormData={setFormData} onOpenModal={() => setIsModalOpen(true)}/> */}
            {/* <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData((prev) => { return { ...prev, currency: e.target.value }})}
              className="w-full px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una moneda</option>
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select> */}
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
            disabled
            className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-30 disabled:pointer-events-none focus:ring-2 focus:ring-blue-500"
          >
            Continuar
          </button>
        </div>
      </form>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Selecciona una criptomoneda</h2>
        {/* Aquí puedes agregar más contenido para el modal */}
      </Modal>
    </>
  );
};

export default CreatePayment;