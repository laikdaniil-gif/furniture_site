import api from './axiosInstance';

export const createOrder = (phone, postcode, address) =>
  api.post('/order', { phone, postcode, address });

export const getUserOrders = (userId) => api.get(`/order/user/${userId}`);

export const getAllOrders = () => api.get('/order');

export const updateOrderStatus = (orderId, status) => api.put(`/order/${orderId}`, { status });

export const deleteOrder = (orderId) => api.delete(`/order/${orderId}`);