import api from './axiosInstance';

export const register = (email, password, role = 'USER') =>
  api.post('/user/registration', { email, password, role });

export const login = (email, password) =>
  api.post('/user/login', { email, password });

export const checkAuth = () => api.get('/user/auth');