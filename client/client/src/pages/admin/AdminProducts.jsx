import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../api/products';
import AddProductModal from '../../components/AddProductModal';
import EditProductModal from '../../components/EditProductModal';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // чтобы не открывать редактирование при клике на кнопку удаления
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

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="admin-actions">
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-small">
          <i className="fas fa-plus"></i> Добавить товар
        </button>
      </div>
      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadProducts}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onSuccess={loadProducts}
      />
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Цена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr 
                key={p.id} 
                onClick={() => handleRowClick(p)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} ₽</td>
                <td>
                  <button 
                    onClick={(e) => handleDelete(p.id, e)} 
                    className="delete-btn"
                    style={{ background: '#D3D3D3', color: 'Black', border: '1px', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', cursor: 'pointer' }}
                  >
                    🗑️ Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;