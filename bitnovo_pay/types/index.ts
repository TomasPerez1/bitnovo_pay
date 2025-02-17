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
  amount: number;
  concept: string;
  currency: string;
  status: string;
  address: string;
  qrCode: string;
}