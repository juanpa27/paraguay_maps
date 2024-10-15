import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl">
      <h1 className="text-5xl font-bold text-center text-white">Paraguay Maps</h1>
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <form className="space-y-6">
          <div className="relative">
            <label htmlFor="username" className="text-sm font-medium text-gray-300 block mb-2">Usuario</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 focus:border-gray-500"
                placeholder="Ingrese su usuario"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-2">Contrase&ntilde;a</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input input-bordered w-full pl-10 pr-10 bg-gray-700 text-white border-gray-600 focus:border-gray-500"
                placeholder="ingrese su contraseña"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}