import { create } from 'zustand';
import { getCart, addToCart, removeCartItem } from '../api/cart';

const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,
  totalCount: 0,
  isLoading: false,
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getCart(); // data – массив CartProduct
      const itemsWithProduct = data.map(cp => ({
        id: cp.id,
        quantity: cp.quantity || 1,
        product: cp.Product,
      }));
      const totalCount = itemsWithProduct.reduce((sum, i) => sum + i.quantity, 0);
      const totalPrice = itemsWithProduct.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      set({ items: itemsWithProduct, totalCount, totalPrice, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
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
}));

export default useCartStore;