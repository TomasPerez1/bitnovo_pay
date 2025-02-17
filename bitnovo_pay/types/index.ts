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
  fiat_amount: number;
  currency_id: string;
  created_at: string;
  notes: string;
  status: string;
  address: string;
  qrCode: string;
}