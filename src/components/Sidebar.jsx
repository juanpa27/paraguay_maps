import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Función para determinar si la ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
      </div>

      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-auto
        bg-base-200 p-4
      `}>
        <div className="flex justify-between items-center lg:hidden">
          <h2 className="text-xl font-semibold">Menú</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-base-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="menu mt-4">
          <li className={isActive('/admin') ? 'bordered' : ''}>
            <Link to="/admin" onClick={toggleSidebar}>Dashboard</Link>
          </li>
          <li className={isActive('/admin/maps') ? 'bordered' : ''}>
            <Link to="/admin/maps" onClick={toggleSidebar}>Gestión de Mapas</Link>
          </li>
          <li className={isActive('/admin/add-map') ? 'bordered' : ''}>
            <Link to="/admin/add-map" onClick={toggleSidebar}>Agregar Mapa</Link>
          </li>
          
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;