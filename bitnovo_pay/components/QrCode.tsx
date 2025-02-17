import { QRCodeSVG } from 'qrcode.react'

const QRCode = ({adress}: {adress: string}) => {

  return (
    <picture className="flex flex-col shadow-2xl rounded-xl  w-fit mx-auto items-center gap-4 p-4 ">
      <QRCodeSVG value={adress} size={200} level="H" />
    </picture>
  );
}

export default QRCode;