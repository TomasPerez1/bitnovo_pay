// import useCurrencies from "@/hooks/useCurrencies";
// import { Currency } from "@/types";
// import { useState } from "react";
// import Image from "next/image";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Select, 
//   SelectItem
// } from "@heroui/react";

import { useState } from "react";
import { Modal,  ModalContent, ModalHeader,ModalBody,ModalFooter, Button, useDisclosure} from "@heroui/react"; // Importar componentes de HeroUI
import useCurrencies from "@/hooks/useCurrencies";

const CryptoModal = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { currencies, loading, error } = useCurrencies();
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null); 
  
  const handleSelect = (cryptoId: string) => {
    setSelectedCrypto(cryptoId); // Almacenar la criptomoneda seleccionada
    // closeModal(); // Cerrar el modal después de seleccionar
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button onPress={onOpen} className="bg-blue-600 text-white">
        Seleccionar criptomoneda
      </Button>

      {/* Modal */}
      <Modal className=" px-1 bg-white shadow-md rounded-xl" classNames={{
        closeButton: "text-black text-3xl"
      }} size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="overflow-hidden ">
          {(onClose) => (
            <>
              <ModalHeader className="">
                <h2 className="text-xl font-bold">Seleccionar criptomoneda</h2>
              </ModalHeader>

              <ModalBody
                className="mx-auto p-8 rounded-xl  bg-white  w-full"
              >
                {/* Campo de búsqueda (opcional) */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>

                <div className="space-y-2">
                  {loading && <p>Cargando criptomonedas...</p>}
                  {error && <p className="text-red-600">{error}</p>}
                  {currencies.map((crypto) => (
                  <div
                    key={crypto.name}
                    onClick={() => handleSelect(crypto.name)} // Seleccionar la criptomoneda al hacer clic
                    className={`flex items-center justify-between p-2 cursor-pointer ${
                      selectedCrypto === crypto.blockchain
                        ? "bg-blue-100" 
                        : "hover:bg-gray-100" 
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{crypto.name}</span>
                      <span className="text-gray-500">{crypto.name}</span>
                    </div>
                    {selectedCrypto === crypto.name && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    </div>
                  ))}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button onPress={onClose} className="bg-gray-500 text-white">
                  Cerrar
                </Button>
                <Button onPress={onClose} className="bg-blue-600 text-white">
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        
        </ModalContent>
      </Modal>
    </>
  );
};

export default CryptoModal;

{/* {currencies.map((crypto) => (
                    <div
                      key={crypto.name}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span>{crypto.name}</span>
                        <span className="text-gray-500">{crypto.name}</span>
                      </div>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))} */}

// const Arrow_down = () => {
//   return (<svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>)
// }

// const CurrencySelector = ({ currencies, currency, setFormData, onOpenModal }: {currencies: Currency[]; currency: Currency;   setFormData: any; onOpenModal: () => void }) => {
//   console.log("CURRENCyyy", currencies)

//   return (
//     <Select className="w-full text-primary border-[1px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" label="Select a crypto">
//       {currencies.map((curr, i) => (
//         <SelectItem 
//           key={i}
//           className="px-2 py-3.5 border  border-gray-300 rounded-md focus:outline-none"
//           startContent={
//             <Image 
//             className="p-2 rounded-xl" 
//             width={50} 
//             height={50} 
//             alt={curr.symbol} 
//             src={curr.image}/>}
//         >
//         {currency.name}
//         </SelectItem>
//       ))}
//     </Select>

    // <div id="main" className="w-80 border rounded" onPress={onOpenModal}>
    //   <Arrow_down/>
    //   <button className="w-full p-2 text-left border-b">
    //     {selectedCrypto ? (
    //       <div className="flex items-center gap-2">
    //         <img src={currencies[0].image} alt={currencies[0].name} className="w-5 h-5" />
    //         {currencies[0].name} 
            
    //       </div>
    //     ) : (
    //       'Seleccionar criptomoneda'
    //     )}
    //   </button>
    // </div>
      //  <ul className="max-h-60 overflow-y-auto border-t">
      //   {currencies.map((crypto) => (
      //     <li
      //       key={crypto.symbol}
      //       className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
      //       onPress={() => setSelectedCrypto(crypto.symbol)}
      //     >
      //       <img src={crypto.image} alt={crypto.name} className="w-5 h-5" />
      //       {crypto.name}
      //     </li>
      //   ))}
      // </ul> 
    
//   );
  
// }
// export default CurrencySelector;