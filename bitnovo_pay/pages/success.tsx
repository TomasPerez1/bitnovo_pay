import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@heroui/react";

const SuccessPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen relative bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-6 py-8 bg-white p-8 rounded-lg shadow-md text-center">
        <img
          src="/tick-circle.svg"
          alt="Copiar"
          className="w-20 mx-auto"
        />
        <h1 className="text-2xl font-bold text-primary mb-4">¡Pago Completado!</h1>
        <p className="text-gray-700 text-center">Tu pago se ha realizado con éxito</p>
        <Button
          onPress={() => router.push("/")}
          className="w-full mx-auto px-4 py-6 text-base text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-30 disabled:pointer-events-none"
        >
          Crear nuevo pago
        </Button>
      </div>
      <Image
        className='absolute bottom-4' 
        src="/water_mark_bitnovo.png" 
        alt="Descripción de la imagen" 
        width={400} 
        height={200} />
    </div>
    
  );
};

export default SuccessPage;