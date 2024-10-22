import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import MapForm from "../components/MapForm";

const Admin = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Intentar recuperar el usuario de localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        useAuthStore.setState({ user: JSON.parse(storedUser) });
        setLoading(false); // Finaliza la carga si el usuario está recuperado de localStorage
      } else {
        // Si no hay un usuario logueado, redirigir a la página de no autorizado
        navigate("/unauthorized");
      }
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
      <main className="flex-grow">
        <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">Bienvenido a la Administración</h1>
          <p>Aquí puedes cargar los datos y gestionar los mapas de Paraguay.</p>
          
        </div>
        <MapForm />
      </main>
      <Footer />
    </Layout>
  );
};

export default Admin;
