import { useEffect, useState } from 'react';
import { Currency, PaymentOrder } from '../types';
import CurrencySelector from './CurrencySelector';
import Modal from './Modal';
import { RiInformationLine } from '@remixicon/react';

interface PaymentFormProps {
  currencies: Currency[];
  onSubmit: (order: PaymentOrder) => void;
}

const CreatePayment = ({ onSubmit, currencies }: PaymentFormProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState<Currency>(currencies[0]);
  const [formData, setFormData] = useState<{ amount: number; concept: string; }>({
    amount: 0,
    concept: '',
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

    if (!formData.amount || !formData.concept ) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      // Crear el pago usando el endpoint POST /orders
      // const response = await api.post("/orders", {
      //   amount,
      //   concept,
      //   currency: selectedCrypto,
      // });

      // Manejar la respuesta (puedes redirigir a otra pantalla o mostrar un mensaje)
      // console.log("Pago creado:", response.data);
      // setFormError(null); // Limpiar errores
    } catch (err) {
      console.log(error)
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
              type="number"
              step="0.01"
              id="amount"
              // value={formData.amount}
              defaultValue={""}
              onChange={(e) => {
                const value = e.target.value.replace(',', '.'); // Reemplaza la coma por un punto
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue) && /^\d+(\.\d{0,2})?$/.test(value)) { // Verifica que tenga como máximo 2 decimales
                  setFormData((prev) => { return { ...prev, amount: parsedValue }});
                }
              }}
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