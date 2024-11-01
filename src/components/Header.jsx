import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, Menu } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import Logo from './Logo';

export default function Header({ toggleSidebar }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login-admin-secret');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`navbar transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'h-16 bg-base-100/80 backdrop-blur-md shadow-lg' 
            : 'h-20 bg-base-100 shadow-md'
          }`}
      >
        <div className="flex-1 items-center">
          <button 
            className="lg:hidden btn btn-ghost btn-circle mr-2"
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <Menu className={`transition-all duration-300 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
          </button>
          <Logo 
            className="text-primary transition-all duration-300" 
            size={isScrolled ? 45 : 60} 
            circle={true} 
          />
          <h1 className={`normal-case transition-all duration-300 ml-2
            ${isScrolled ? 'text-lg' : 'text-xl'}`}
          >
            Paraguay Maps
          </h1>
        </div>
        <div className="flex-none flex items-center space-x-4">
          <ThemeSelector />
          {user && (
            <button
              className={`btn btn-error ${isScrolled ? 'btn-xs' : 'btn-sm'} 
                transition-all duration-300`}
              onClick={handleLogout}
              aria-label="Cerrar Sesión"
            >
              <LogOut className={`transition-all duration-300 
                ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} 
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}