import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, Menu } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import Logo from './Logo';

export default function Header({ toggleSidebar }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login-admin-secret');
  };

  return (
    <div className="navbar bg-base-100 shadow-md w-full">
      <div className="flex-1 items-center">
        <button 
          className="lg:hidden btn btn-ghost btn-circle mr-2"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Logo className="text-primary" size={60} circle={true} />
        <h1 className="normal-case text-xl ml-2">Paraguay Maps</h1>
      </div>
      <div className="flex-none flex items-center space-x-4">
        <ThemeSelector />
        {user && (
          <button
            className="btn btn-error btn-sm"
            onClick={handleLogout}
            aria-label="Cerrar Sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}