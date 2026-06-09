import api from './axiosInstance';

export const fetchTypes = () => api.get('/productType');
export const createType = (name) => api.post('/productType', { name });
export const deleteType = (id) => api.delete(`/productType/${id}`);