import React, { useEffect } from 'react';
import useMetaMask from '../hooks/useMetaMask';
import { Button } from '@heroui/react';
import { PaymentInfo } from '@/types';
import { useRouter } from 'next/router';

const MetaMaskButton = ({paymentInfo}: {paymentInfo: PaymentInfo}) => {
  const router = useRouter();
  const { connect, account, error: mmError, sendTransaction } = useMetaMask();

  useEffect(() => {
    if(!account) {
      connect()
    }
  }, [])

  const handleMetaMaskPayment = async () => {
    try {
      // await connect()
      if (!account) {
        await connect();
        return;
      }

      const tx = await sendTransaction({
        to: paymentInfo.address,
        amountInEth: paymentInfo.crypto_amount.toString()
      });

    } catch (err) {
      console.error('Error en la transacción:', err);
      router.push('/error');
    }
  };


  return (
    <picture id="META" className="w-full flex flex-col items-center p-4 gap-4">
      <Button  onPress={handleMetaMaskPayment} className="w-[150px] p-2 h-[150px] bg-white text-white  shadow-2xl rounded">
        <img src="/metamask-icon.svg" alt="MetaMask" className="p-4" />
      </Button>
      {/* {!account ? (
        <Button  onPress={handleMetaMaskPayment} className="w-[150px] p-2 h-[150px] bg-white text-white  shadow-2xl rounded">
          <img src="/metamask-icon.svg" alt="MetaMask" className="p-4" />
        </Button>
      ) : (
        <div onClick={handleMetaMaskPayment} className="cursor-pointer transition-colors hover:bg-orange-300 w-[150px] p-2 h-[150px] bg-orange-400 font-bold text-center text-white shadow-xl rounded flex items-center">
          <p className='text-white'>Enviar por metamask</p>
        </div>
      )} */}
    </picture>
  );
};

export default MetaMaskButton;
