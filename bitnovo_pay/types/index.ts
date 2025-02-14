export interface Currency {
  symbol: string;
  name: string;
  minAmount: number;
  maxAmount: number;
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