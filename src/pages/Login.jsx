import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../config/supabaseClient';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });
  
      if (error) {
        setError('Usuario o contraseña incorrectos');
      } else {
        // Guardar el usuario en Zustand y en localStorage
        useAuthStore.setState({ user: data.user });
        localStorage.setItem('auth_token', data.session.access_token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Guardar usuario en localStorage
  
        // Redirigir a la página de administración
        navigate('/admin');
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="card w-full max-w-md bg-gray-800 shadow-xl">
        <div className="card-body space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">Paraguay Maps</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">Login</h2>
          
          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isLoading && (
            <div className="alert alert-info">
              <Loader className="w-6 h-6 shrink-0 animate-spin" />
              <span>Iniciando Sesión...</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text text-gray-300">Usuario</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="username"
                  type="text"
                  className="input input-bordered w-full pl-10 bg-gray-700 text-white"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text text-gray-300">Contraseña</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 bg-gray-700 text-white"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Iniciando Sesión...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}