import api from './axiosInstance';

export const fetchMaterials = () => api.get('/material');
export const createMaterial = (name) => api.post('/material', { name });