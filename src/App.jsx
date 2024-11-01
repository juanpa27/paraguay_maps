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
import ProtectedRoute from "./components/ProtectedRoute";
import AddMapPage from "./pages/AddMapPage";
import MapsPage from "./pages/MapsPage";
import CategoryPage from "./pages/CategoryPage";
import RouteChangeTracker from "./components/RouteChangeTracker";

import "./index.css";

function App() {
  
  return (
    <Router>
       <RouteChangeTracker />
      <Routes>
        <Route path="/login-admin-secret" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<MapsPage />} />
          <Route path="maps" element={<MapsPage />} />
          <Route path="add-map" element={<AddMapPage />} />
        </Route>
        <Route
          path="/"
          element={
            <Layout>
              <Header />
              <HeroParaguay className="mb-32" />
              <main className="flex-grow">
                <MapLinks />
                <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto"></div>
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
