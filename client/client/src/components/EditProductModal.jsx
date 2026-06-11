import { useState, useEffect } from 'react';
import { updateProduct } from '../api/products';
import { fetchTypes } from '../api/types';
import { fetchMaterials } from '../api/materials';

const EditProductModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    productTypeId: '',
    materialId: '',
    quantity: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [infoFields, setInfoFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        size: product.size || '',
        productTypeId: product.productTypeId || '',
        materialId: product.materialId || '',
        quantity: product.quantity || ''
      });

      if (product.info && product.info.length) {
        setInfoFields(product.info.map(i => ({ title: i.title, description: i.description })));
      } else {
        setInfoFields([{ title: '', description: '' }]);
      }
      
      fetchTypes().then(res => setTypes(res.data));
      fetchMaterials().then(res => setMaterials(res.data));
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleInfoChange = (index, field, value) => {
    const updated = [...infoFields];
    updated[index][field] = value;
    setInfoFields(updated);
  };

  const addInfoField = () => {
    setInfoFields([...infoFields, { title: '', description: '' }]);
  };

  const removeInfoField = (index) => {
    setInfoFields(infoFields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('size', formData.size);
      submitData.append('productTypeId', formData.productTypeId);
      submitData.append('materialId', formData.materialId);
      submitData.append('quantity', formData.quantity);
      if (imageFile) submitData.append('img', imageFile);
      
      const validInfo = infoFields.filter(f => f.title.trim() && f.description.trim());
      if (validInfo.length) {
        submitData.append('info', JSON.stringify(validInfo));
      }

      await updateProduct(product.id, submitData);
      alert('Товар успешно обновлён');
      onSuccess();
      onClose();
    } catch (err) {
      alert('Ошибка обновления: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать товар: {product.name}</h3>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Название</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Цена</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Размер</label>
            <input type="text" name="size" value={formData.size} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Количество</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Категория</label>
            <select name="productTypeId" value={formData.productTypeId} onChange={handleChange}>
              <option value="">Выберите</option>
              {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Материал</label>
            <select name="materialId" value={formData.materialId} onChange={handleChange}>
              <option value="">Выберите</option>
              {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Изображение (оставьте пустым, чтобы не менять)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          
          <div className="form-group">
            <label>Характеристики</label>
            {infoFields.map((field, idx) => (
              <div key={idx} className="info-row">
                <input
                  type="text"
                  placeholder="Название (например, 'Материал')"
                  value={field.title}
                  onChange={(e) => handleInfoChange(idx, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Описание"
                  value={field.description}
                  onChange={(e) => handleInfoChange(idx, 'description', e.target.value)}
                />
                {infoFields.length > 1 && (
                  <button type="button" onClick={() => removeInfoField(idx)}>✖</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addInfoField} className="btn-small">+ Добавить характеристику</button>
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;