import useCurrencies from "@/hooks/useCurrencies";
import { Currency } from "@/types";
import { useState } from "react";
import Image from "next/image";

const Arrow_down = () => {
  return (<svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>)
}

const CurrencySelector = ({ currencies, currency, setFormData, onOpenModal }: {currencies: Currency[]; currency: Currency;   setFormData: any; onOpenModal: () => void }) => {
  console.log("CURRENCyyy", currencies)

  return (
    <div id="main" className="w-full text-primary px-2 py-3.5 border border-gray-300 rounded-md focus:outline-none " onClick={onOpenModal}>
      <div className="border-2 border-yellow-300">
        <Image 
          className="p-2 rounded-xl" 
          width={50} 
          height={50} 
          alt={currency.symbol} 
          src={currency.image}/> 
        <p>{currency.name}</p>
      </div> 
      <Arrow_down/>
    </div>
    // <div id="main" className="w-80 border rounded" onClick={onOpenModal}>
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
      //       onClick={() => setSelectedCrypto(crypto.symbol)}
      //     >
      //       <img src={crypto.image} alt={crypto.name} className="w-5 h-5" />
      //       {crypto.name}
      //     </li>
      //   ))}
      // </ul> 
    
  );
  
}
export default CurrencySelector;