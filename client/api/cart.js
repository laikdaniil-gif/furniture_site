import api from './axiosInstance';

export const getCart = () => api.get('/'); // роутер корзины смонтирован на /cart, уточните
// предположим, что в routes/index.js подключен shoppingCartRouter на '/cart'
// тогда вызовы будут:
export const getCart = () => api.get('/cart');
export const addToCart = (productId) => api.post('/cart', { productId });
export const removeCartItem = (cartProductId) => api.post('/cart/delete', { id: cartProductId });