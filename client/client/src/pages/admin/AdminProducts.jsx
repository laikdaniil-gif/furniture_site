import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, createProduct } from '../../api/products';
import { fetchTypes } from '../../api/types';
import { fetchMaterials } from '../../api/materials';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetchTypes().then(res => setTypes(res.data));
    fetchMaterials().then(res => setMaterials(res.data));
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

  const handleAddProduct = async () => {
    const name = prompt('Название товара');
    if (!name) return;
    const price = prompt('Цена');
    const size = prompt('Размер (например, 35мм)');
    const typeId = prompt('ID категории (число)');
    const materialId = prompt('ID материала (число)');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', 100);
    formData.append('size', size || 'стандарт');
    formData.append('productTypeId', typeId);
    formData.append('materialId', materialId);
    
    // Запрашиваем файл изображения
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      formData.append('img', e.target.files[0]);
      try {
        await createProduct(formData);
        alert('Товар создан');
        loadProducts();
      } catch (err) {
        alert('Ошибка создания товара');
      }
    };
    fileInput.click();
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div>
      <div className="admin-actions">
        <button onClick={handleAddProduct} className="btn btn-small">
          <i className="fas fa-plus"></i> Добавить товар
        </button>
      </div>
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
                <td>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500">
                    <i className="fas fa-trash"></i>
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