import { useEffect, useState } from 'react';
import useProductStore from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { fetchTypes } from '../api/types';
import { fetchMaterials } from '../api/materials'; // ← правильный импорт

const CatalogPage = () => {
  const { products, loading, filters, setFilter, loadProducts } = useProductStore();
  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    loadProducts();
    fetchTypes().then(res => setTypes(res.data));
    fetchMaterials().then(res => setMaterials(res.data));
  }, [loadProducts]);

  const handleTypeChange = (e) => setFilter('productTypeId', e.target.value);
  const handleMaterialChange = (e) => setFilter('materialId', e.target.value);

  return (
    <>
      <div className="catalog-header">
        <h2 className="section-title">Каталог фурнитуры</h2>
        <div className="filters">
          <select className="filter-select" value={filters.productTypeId} onChange={handleTypeChange}>
            <option value="">Все категории</option>
            {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select className="filter-select" value={filters.materialId} onChange={handleMaterialChange}>
            <option value="">Все материалы</option>
            {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="text-center">Товаров не найдено</div>
      ) : (
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </>
  );
};

export default CatalogPage;