import type { Currency } from "@/types";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader,ModalBody, useDisclosure} from "@heroui/react"; 
import {RiArrowDownSLine, RiArrowRightSLine , RiCheckboxCircleFill} from "@remixicon/react"
import useCurrencies from "@/hooks/useCurrencies";


const CurrencySelector = ({currencies, selectedCrypto, setSelectedCrypto }: { currencies: Currency[], selectedCrypto: Currency; setSelectedCrypto: any }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleSelect = ({cryptoId, closeModal}: {cryptoId: string, closeModal: () => void}) => {
    const newCurrency = currencies.find(curr => curr.symbol === cryptoId)
    setSelectedCrypto(newCurrency); 
    closeModal();
  };

  return (
    <>
      <div
        key={selectedCrypto.symbol}
        className="text-start w-full text-primary  border border-gray-300 rounded-md "
      >
        <div onClick={onOpen} className="flex justify-between gap-2 py-0.5 items-center">
          <div className="flex items-center">
            <Image 
              className="p-2 rounded-xl" 
              width={50} 
              height={50} 
              alt={selectedCrypto.name} 
              src={selectedCrypto.image}/>
      
            <span>
              <p>{selectedCrypto.name}</p>
              <p className="text-gray-400 text-xs">{selectedCrypto.symbol.replaceAll("_", " ")}</p>
            </span>
          </div>
          <RiArrowDownSLine className="h-6 w-6 text-gray-500 mr-1"/>
        </div>
        </div>

      <Modal 
        backdrop="transparent" 
        className=" bg-white shadow-md rounded-xl py-10 px-4" 
        classNames={{
          closeButton: "text-gray-600 text-2xl"
        }} 
        size="xl" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
      >
        <ModalContent className="overflow-hidden ">
          {(onClose) => (
            <>
              <ModalHeader className="text-start m-0 px-0 py-2">
                <h2 className="text-xl font-bold ">Seleccionar criptomoneda</h2>
              </ModalHeader>

              <ModalBody
                className="mx-auto mt-4  p-0 rounded-xl  py-0  bg-white  w-full"
              >
                <div className="mb-0.5 w-full">
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>

                <div className="space-y-2">
                  {currencies.map((crypto) => (
                  <div
                    key={crypto.name}
                    onClick={() => handleSelect({cryptoId: crypto.symbol, closeModal: onClose})} 
                    className={`flex rounded-lg items-center justify-between py-1 cursor-pointer ${
                      selectedCrypto.blockchain === crypto.blockchain
                        ? "bg-blue-100" 
                        : "hover:bg-gray-100" 
                    }`}
                  >
                    <div className="flex  justify-between gap-2">
                      <div className="flex items-center">
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
                      </div>
                    </div>
                      {selectedCrypto.blockchain === crypto.blockchain
                        ? (<RiCheckboxCircleFill className="h-6 w-6 text-blue-500 mr-1"/>) 
                        : (<RiArrowRightSLine className="h-6 w-6 text-gray-500 mr-1"/>)
                      }
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CurrencySelector;
