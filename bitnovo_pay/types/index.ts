export interface Currency {
  symbol: string;
  name: string;
  min_amount: string;
  max_amount: string;
  blockchain: string;
  image: string;
}

export interface PaymentOrder {
  amount: number;
  concept: string;
  currency: string;
}

export interface PaymentInfo {
  id: string;
  status: string;
  tag_memo: string;
  identifier: string;
  currency_id: string;
  crypto_amount: number;
  fiat_amount: number;
  address: string;
  notes: string;
  expired_time: string;
  created_at: string;
}

// declare global {
//   interface Window {
//     ethereum: import('@metamask/providers').MetaMaskInpageProvider;
//   }
// }