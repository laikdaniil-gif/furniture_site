// src/pages/Admin/AdminProducts.jsx
import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../api/products';
import AddProductModal from '../../components/AddProductModal';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await fetchProducts({ limit: 200 });
      setProducts(data.rows);
    } catch (err) {
      alert('Ошибка загрузки товаров');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Удалить товар?')) {
      try {
        await deleteProduct(id);
        alert('Товар удалён');
        loadProducts();
      } catch (err) {
        alert('Ошибка удаления');
      }
    }
  };

  return (
    <div>
      <div className="admin-actions">
        <button onClick={() => setIsModalOpen(true)} className="btn btn-small">
          <i className="fas fa-plus"></i> Добавить товар
        </button>
      </div>
      <AddProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProducts}
      />
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Название</th><th>Цена</th><th>Действия</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} ₽</td>
                <td><button onClick={() => handleDelete(p.id)} className="text-red-500"><i className="fas fa-trash"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;