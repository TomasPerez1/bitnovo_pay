import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

const useMetaMask = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const connect = async () => {
    setIsLoading(true);
    try {
      const ethereum = await detectEthereumProvider();

      if (!ethereum) {
        throw new Error('MetaMask no está instalado. Por favor, instálalo para continuar.');
      }

      await (ethereum as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xAA36A7' }], // Sepolia testnet
      });

      await (ethereum as any).request({ method: 'eth_requestAccounts' });
      
      const newProvider = new ethers.BrowserProvider(ethereum as any);
      const newSigner = await newProvider.getSigner();
      const newAccount = await newSigner.getAddress();

      setProvider(newProvider);
      setSigner(newSigner);
      setAccount(newAccount);
      setError(null);
    } catch (err: any) {
      console.error('Error al conectar con MetaMask:', err);
      setError(err.message || 'Error desconocido al conectar con MetaMask.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendTransaction = async ({to, amountInEth}: {to: string; amountInEth: string}) => {
    if (!signer || !provider) {
      setError('No se encontró un signer o provider. Por favor, conecta MetaMask primero.');
      return;
    }

    try {
      const value = ethers.parseEther(amountInEth);

      const tx = await signer.sendTransaction({
        to,
        value,
      });
      const receipt = await tx.wait()
  
      if (receipt?.status === 1) {
        router.push('/success'); 
      } else {
        router.push('/error'); 
      }

      return tx;
    } catch (err: any) {
      return router.push('/error'); 
    }
  };

  useEffect(() => {
    const init = async () => {
      const ethereum = await detectEthereumProvider();
      if (!ethereum) return;

      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      };

      const handleDisconnect = () => {
        setAccount(null);
        setProvider(null);
        setSigner(null);
        setError('MetaMask desconectado');
      };

      (ethereum as any).on('accountsChanged', handleAccountsChanged);
      (ethereum as any).on('disconnect', handleDisconnect);

      return () => {
        (ethereum as any).removeListener('accountsChanged', handleAccountsChanged);
        (ethereum as any).removeListener('disconnect', handleDisconnect);
      };
    };

    init();
  }, []);

  return { connect, account, error, provider, signer, isLoading, sendTransaction };
};

export default useMetaMask;


