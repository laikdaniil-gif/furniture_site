import { useState, useEffect } from 'react';
import { createProduct } from '../api/products';
import { fetchTypes } from '../api/types';
import { fetchMaterials } from '../api/materials';

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    productTypeId: '',
    materialId: '',
    quantity: 100,
    info: [] // массив характеристик { title, description }
  });
  const [imageFile, setImageFile] = useState(null);
  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infoFields, setInfoFields] = useState([{ title: '', description: '' }]);

  useEffect(() => {
    if (isOpen) {
      // Загружаем типы и материалы при открытии
      fetchTypes().then(res => setTypes(res.data));
      fetchMaterials().then(res => setMaterials(res.data));
    }
  }, [isOpen]);

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
    const updated = infoFields.filter((_, i) => i !== index);
    setInfoFields(updated);
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
            const infoJson = JSON.stringify(validInfo);
            console.log('Отправляемые характеристики:', infoJson); // для отладки
            submitData.append('info', infoJson);
        }

      await createProduct(submitData);
      alert('Товар успешно создан');
      onSuccess();
      onClose();
      setFormData({ name: '', price: '', size: '', productTypeId: '', materialId: '', quantity: 100, info: [] });
      setImageFile(null);
      setInfoFields([{ title: '', description: '' }]);
    } catch (err) {
      alert('Ошибка создания товара: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Добавить товар</h3>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Название *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Цена *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Размер</label>
            <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="35мм, M/L и т.д." />
          </div>
          <div className="form-group">
            <label>Количество</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Категория *</label>
            <select name="productTypeId" value={formData.productTypeId} onChange={handleChange} required>
              <option value="">Выберите</option>
              {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Материал *</label>
            <select name="materialId" value={formData.materialId} onChange={handleChange} required>
              <option value="">Выберите</option>
              {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Изображение *</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          
          <div className="form-group">
            <label>Характеристики</label>
            {infoFields.map((field, idx) => (
              <div key={idx} className="info-row">
                <input
                  type="text"
                  placeholder=""
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
              {loading ? 'Создание...' : 'Создать товар'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;