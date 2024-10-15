import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapCard from "./components/MapCard";
import HeroParaguay from "./components/HeroParaguay";
import Login from "./pages/Login"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login-admin-secret" // Ruta oculta para el login
          element={<Login />}
        />
        <Route
          path="/"
          element={
            <Layout>
              <Header />
              <HeroParaguay />
              <main className="flex-grow">
                <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
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
              <Footer />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;