import { useState, useEffect } from 'react';
import { fetchMaterials, createMaterial, deleteMaterial } from '../../api/materials';

const AdminMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [newName, setNewName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const load = async () => {
    const { data } = await fetchMaterials();
    setMaterials(data);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newName.trim()) return;
    try {
      await createMaterial(newName);
      setNewName('');
      load();
      setSuccessMessage('Добавлено');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      alert('Ошибка добавления');
    }
  };

  const del = async (id) => {
    if (window.confirm('Удалить материал?')) {
      try {
        await deleteMaterial(id);
        load();
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
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Название материала"
        />
        <button onClick={add} className="btn btn-small">Добавить</button>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ul className="admin-list">
        {materials.map(m => (
          <li key={m.id}>
            <span>{m.name}</span>
            <button onClick={() => del(m.id)} className="delete-btn">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMaterials;