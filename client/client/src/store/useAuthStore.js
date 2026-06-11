import { create } from 'zustand';
import { register, login, checkAuth } from '../api/auth';
import { decodeToken } from '../utils/decodeToken';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await login(email, password);
      localStorage.setItem('token', data.token);
      const decoded = decodeToken(data.token);
      set({ user: { id: decoded.id, email: decoded.email, role: decoded.role }, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  register: async (email, password, role) => {
    set({ isLoading: true });
    try {
      const { data } = await register(email, password, role);
      localStorage.setItem('token', data.token);
      const decoded = decodeToken(data.token);
      set({ user: { id: decoded.id, email: decoded.email, role: decoded.role }, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    set({ isLoading: true });
    try {
      await checkAuth();
      const decoded = decodeToken(token);
      set({ user: { id: decoded.id, email: decoded.email, role: decoded.role }, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('token');
      set({ isLoading: false, user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;