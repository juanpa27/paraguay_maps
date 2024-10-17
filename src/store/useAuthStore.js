import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem('auth_token'); // Limpia el token del localStorage al hacer logout
    set({ user: null });
  },
}));