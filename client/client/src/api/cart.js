import api from './axiosInstance';

export const getCart = () => api.get('/cart');
export const addToCart = (productId) => api.post('/cart', { productId });
export const removeCartItem = (cartProductId) =>
  api.post('/cart/delete', { id: cartProductId });