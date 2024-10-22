import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null, 
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem('auth_token'); 
    localStorage.removeItem('user'); 
    set({ user: null });
  },
}));
