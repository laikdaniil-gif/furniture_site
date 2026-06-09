import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';
import { fetchTypes } from '../api/types';
import { fetchMaterials } from '../api/materials';

const CatalogPage = () => {
  const { products, loading, filters, setFilter, loadProducts } = useProductStore();
  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    loadProducts();
    fetchTypes().then(res => setTypes(res.data));
    fetchMaterials().then(res => setMaterials(res.data));
  }, []);

  const handleTypeChange = (e) => setFilter('productTypeId', e.target.value);
  const handleMaterialChange = (e) => setFilter('materialId', e.target.value);

  return (
    <div>
      <div className="filters">
        <select onChange={handleTypeChange} value={filters.productTypeId}>
          <option value="">Все типы</option>
          {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select onChange={handleMaterialChange} value={filters.materialId}>
          <option value="">Все материалы</option>
          {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
      {loading && <div>Загрузка...</div>}
      <div className="product-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {/* Пагинация – по желанию */}
    </div>
  );
};