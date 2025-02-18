import { QRCodeSVG } from 'qrcode.react'

interface QrProps {
  crypto_amount: number;
  currency: string; 
  adress: string;
  concept: string;
  tag_memo: string;
}

const QRCode = ({currency, adress, crypto_amount}: QrProps) => {
  const uri =`${currency.replaceAll("_", "").toLowerCase()}:${adress}?amount=${crypto_amount}`
  console.log(uri)

  return (
    <picture className="shadow-2xl rounded-xl  w-fit mx-auto  p-4 ">
      <QRCodeSVG className='p-2' value={adress} size={150} level="H" />
    </picture>
  );
}

export default QRCode;