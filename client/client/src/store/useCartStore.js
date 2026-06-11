import { create } from 'zustand';
import { getCart, addToCart, removeCartItem, updateCartItemQuantity } from '../api/cart';

const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,
  totalCount: 0,
  isLoading: false,
  
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getCart();
      const itemsWithProduct = data
        .map(cp => {
          const product = cp.Product || cp.product;
          if (!product) return null;
          return { id: cp.id, quantity: cp.quantity || 1, product };
        })
        .filter(item => item !== null);
      const totalCount = itemsWithProduct.reduce((sum, i) => sum + i.quantity, 0);
      const totalPrice = itemsWithProduct.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      set({ items: itemsWithProduct, totalCount, totalPrice, isLoading: false });
    } catch (error) {
      console.error('fetchCart error:', error);
      set({ isLoading: false });
    }
  },
  
  addItem: async (productId) => {
    await addToCart(productId);
    await get().fetchCart();
  },
  
  removeItem: async (cartProductId) => {
    await removeCartItem(cartProductId);
    await get().fetchCart();
  },
  
  updateItemLocally: (cartProductId, newQuantity) => {
    const { items } = get();
    const updatedItems = items.map(item =>
      item.id === cartProductId ? { ...item, quantity: newQuantity } : item
    );
    const totalCount = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = updatedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    set({ items: updatedItems, totalCount, totalPrice });
    
    updateCartItemQuantity(cartProductId, newQuantity).catch(err => {
      console.error('Ошибка синхронизации количества:', err);
      get().fetchCart();
    });
  },
}));

export default useCartStore;