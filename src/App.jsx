import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import MapCard from "./components/MapCard";
import HeroParaguay from "./components/HeroParaguay";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Layout>
      {/* Header siempre fijo al inicio */}
      <Header />
      
      {/* Hero Section para destacar Paraguay */}
      <HeroParaguay />

      {/* Contenido Principal */}
      <main className="flex-grow py-8">
        <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 lg:px-0">
          <MapCard
            imageUrl="/images/3.jpg"
            title="Distritos con mayor proporción de apellidos italianos en Paraguay 🇮🇹"
            description="Mapa de Paraguay con los distritos que tienen mayor proporción de apellidos italianos."
            extraData="Fuente: Forebears.io"
          />
          <MapCard
            imageUrl="/images/1.jpg"
            title="Media de edad Por Departamento en Paraguay 🇵🇾"
            description="Mapa de Paraguay con la media de edad por departamento."
            extraData="Fuente: INE"
          />
        </div>
      </main>

      {/* Footer al final de la página */}
      <Footer />
    </Layout>
  );
}

export default App;
