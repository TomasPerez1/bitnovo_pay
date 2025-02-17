const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">¡Pago Fallido!</h1>
        <p className="text-gray-700">El pago ha expirado o ha sido cancelado.</p>
      </div>
    </div>
  );
};

export default ErrorPage;