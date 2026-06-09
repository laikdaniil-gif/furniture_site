import api from './axiosInstance';

export const createOrder = (userId, phone, postcode, address) =>
  api.post('/order', { id: userId, phone, postcode, address });

export const fetchAllOrders = () => api.get('/order'); // только ADMIN
export const fetchUserOrders = (userId) => api.get(`/order/user/${userId}`);