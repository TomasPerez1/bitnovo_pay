import Image from "next/image";
import { useState } from "react";
import { Modal,  ModalContent, ModalHeader,ModalBody,ModalFooter, Button, useDisclosure} from "@heroui/react"; // Importar componentes de HeroUI
import useCurrencies from "@/hooks/useCurrencies";



const CryptoModal = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { currencies, loading, error } = useCurrencies();
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null); 
  console.log(a)
  const handleSelect = (cryptoId: string) => {
    setSelectedCrypto(cryptoId); // Almacenar la criptomoneda seleccionada
    // closeModal(); // Cerrar el modal después de seleccionar
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={onOpen} className="text-start w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md ">
        Seleccionar criptomoneda
      </button>

      {/* Modal */}
      <Modal backdrop="transparent" className=" px-1 bg-white shadow-md rounded-xl" classNames={{
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
                      <Image 
                        className="p-2 rounded-xl" 
                        width={50} 
                        height={50} 
                        alt={crypto.name} 
                        src={crypto.image}/>
                
                      <span>
                        <p>{crypto.name}</p>
                        <p className="text-gray-400 text-xs">{crypto.symbol.replaceAll("_", " ")}</p>
                      </span>
                      
                      <span className="text-center border-2 w-fit">
                      {/* {
                        selectedCrypto === crypto.blockchain
                        ? <Arrow_down/>
                        : <Arrow_down/>
                      } */}
                      </span>
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
