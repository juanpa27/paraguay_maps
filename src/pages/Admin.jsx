import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const Admin = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!user || !token) {
      // Si no hay un usuario logueado o no hay token, redirigir a la página de no autorizado
      navigate('/unauthorized');
    } else {
      setLoading(false); // Finaliza la carga si el usuario está logueado
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Layout>
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Bienvenido a la Administración</h1>
        <p>Aquí puedes cargar los datos y gestionar los mapas de Paraguay.</p>
        {/* Aquí agregaremos los formularios o herramientas de administración */}
      </div>
      <Footer />
    </Layout>
  );
};

export default Admin;
