import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import MapForm from '../components/MapForm';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null); // Nuevo estado para el mapa seleccionado

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEdit = (map) => {
    setSelectedMap(map);
  };

  const closeForm = () => {
    setSelectedMap(null);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-grow">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="flex-grow p-4">
            {selectedMap ? (
              <MapForm mapData={selectedMap} onClose={closeForm} />
            ) : (
              <Outlet context={{ handleEdit }} />
            )}
          </main>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Admin;