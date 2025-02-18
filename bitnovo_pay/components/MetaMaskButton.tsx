import React from 'react';
import useMetaMask from '../hooks/useMetaMask';
import { Button } from '@heroui/react';
import { PaymentInfo } from '@/types';
import { useRouter } from 'next/router';

const MetaMaskButton = ({paymentInfo}: {paymentInfo: PaymentInfo}) => {
  const router = useRouter();
  const { connect, account, error: mmError, sendTransaction } = useMetaMask();

  const handleMetaMaskPayment = async () => {
    try {
      if (!account) {
        await connect();
        return;
      }

      const tx = await sendTransaction({
        to: paymentInfo.address,
        amountInEth: paymentInfo.crypto_amount.toString()
      });

      await tx?.wait();
    } catch (err) {
      console.error('Error en la transacción:', err);
      router.push('/error');
    }
  };


  return (
    <picture id="META" className="w-full flex flex-col items-center p-4 gap-4">
      {!account ? (
        <Button  onPress={connect} className="w-[150px] p-2 h-[150px] bg-white text-white  shadow-2xl rounded">
          <img src="/metamask-icon.svg" alt="MetaMask" className="p-4" />
        </Button>
      ) : (
        <div className="w-[200px] p-2 h-[200px] shadow-2xl rounded flex items-center">
          <Button onPress={handleMetaMaskPayment} className="max-w-[90%] mx-auto bg-orange-400 text-white text-base  shadow-2xl rounded">
            <p className='text-white'>Enviar por metamask</p>
          </Button>
        </div>
      )}
    </picture>
  );
};

export default MetaMaskButton;
