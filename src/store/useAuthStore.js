import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null, // Inicializa el estado con el valor de localStorage si existe
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem('auth_token'); // Limpia el token del localStorage al hacer logout
    localStorage.removeItem('user'); // Limpia el usuario del localStorage al hacer logout
    set({ user: null });
  },
}));
