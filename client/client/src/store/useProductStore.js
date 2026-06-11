import { create } from 'zustand';
import { fetchProducts } from '../api/products';

const useProductStore = create((set, get) => ({
  products: [],
  count: 0,
  loading: false,
  filters: { materialId: '', productTypeId: '', page: 1, limit: 12 },
  loadProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await fetchProducts(get().filters);
      set({ products: data.rows, count: data.count, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },
  setFilter: (key, value) => {
    const newFilters = { ...get().filters, [key]: value, page: 1 };
    set({ filters: newFilters });
    get().loadProducts();
  },
  setPage: (page) => {
    set(state => ({ filters: { ...state.filters, page } }));
    get().loadProducts();
  },
}));

export default useProductStore;