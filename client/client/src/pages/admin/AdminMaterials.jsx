import { useState, useEffect } from 'react';
import { fetchMaterials, createMaterial, deleteMaterial } from '../../api/materials';

const AdminMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterialName, setNewMaterialName] = useState('');

  const loadMaterials = async () => {
    try {
      const { data } = await fetchMaterials();
      setMaterials(data);
    } catch (err) {
      alert('Ошибка загрузки материалов');
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleCreate = async () => {
    if (!newMaterialName.trim()) return;
    try {
      await createMaterial(newMaterialName);
      alert('Материал добавлен');
      setNewMaterialName('');
      loadMaterials();
    } catch (err) {
      alert('Ошибка создания');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить материал?')) {
      try {
        await deleteMaterial(id);
        alert('Материал удалён');
        loadMaterials();
      } catch (err) {
        alert('Ошибка удаления');
      }
    }
  };

  return (
    <div>
      <div className="admin-add-form">
        <input
          type="text"
          placeholder="Название материала"
          value={newMaterialName}
          onChange={(e) => setNewMaterialName(e.target.value)}
        />
        <button onClick={handleCreate} className="btn btn-small">Добавить</button>
      </div>
      <ul className="admin-list">
        {materials.map(m => (
          <li key={m.id}>
            <span>{m.name}</span>
            <button onClick={() => handleDelete(m.id)} className="text-red-500">удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMaterials;