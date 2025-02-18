import React, { useEffect } from 'react';
import useMetaMask from '../hooks/useMetaMask';
import { Button } from '@heroui/react';
import { PaymentInfo } from '@/types';
import { useRouter } from 'next/router';
import Image from 'next/image';

const MetaMaskButton = ({paymentInfo}: {paymentInfo: PaymentInfo}) => {
  const router = useRouter();
  const { connect, account, sendTransaction } = useMetaMask();

  useEffect(() => {
    if(!account) {
      connect()
    }
  }, [])

  const handleMetaMaskPayment = async () => {
    try {
      if (!account) {
        await connect();
        return;
      }

      await sendTransaction({
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
        <Image src="/metamask-icon.svg" alt="MetaMask" className="p-4" />
      </Button>
    </picture>
  );
};

export default MetaMaskButton;
