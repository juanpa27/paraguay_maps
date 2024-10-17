import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/login-admin-secret');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">No Autorizado</h1>
      <p className="mb-8">No tienes permisos para acceder a esta página.</p>
      <button
        onClick={handleGoBack}
        className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default Unauthorized;
