import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapList from "./components/MapList";
import HeroParaguay from "./components/HeroParaguay";
import MapLinks from "./components/Maplinks";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
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
          path="/admin" // Ruta para la página de administración
          element={<Admin />}
        />
        <Route
          path="/unauthorized" // Ruta para la página no autorizada
          element={<Unauthorized />}
        />
        <Route
          path="/"
          element={
            <Layout>
              <Header />
              <HeroParaguay className="mb-32" />
              <main className="flex-grow">
                <MapLinks />
                <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
                
                  <MapList />
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