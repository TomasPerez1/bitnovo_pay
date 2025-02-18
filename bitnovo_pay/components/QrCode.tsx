import { QRCodeSVG } from 'qrcode.react'

interface QrProps {
  crypto_amount: number;
  currency: string; 
  adress: string;
  concept: string;
  tag_memo: string;
}

const QRCode = ({currency, adress, crypto_amount, tag_memo}: QrProps) => {
  const uri =`ripple:${adress}?amount=${crypto_amount}`
  // console.log("URI", uri)

  return (
    <picture className="flex flex-col shadow-2xl rounded-xl  w-fit mx-auto items-center gap-4 p-4 ">
      <QRCodeSVG value={adress} size={200} level="H" />
    </picture>
  );
}

export default QRCode;