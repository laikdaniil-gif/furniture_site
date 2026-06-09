import api from './axiosInstance';

export const fetchMaterials = () => api.get('/material');
export const createMaterial = (name) => api.post('/material', { name });
export const deleteMaterial = (id) => api.delete(`/material/${id}`);