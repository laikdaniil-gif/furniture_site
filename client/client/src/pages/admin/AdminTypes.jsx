import { useState, useEffect } from 'react';
import { fetchTypes, createType, deleteType } from '../../api/types';

const AdminTypes = () => {
  const [types, setTypes] = useState([]);
  const [newTypeName, setNewTypeName] = useState('');

  const loadTypes = async () => {
    try {
      const { data } = await fetchTypes();
      setTypes(data);
    } catch (err) {
      alert('Ошибка загрузки категорий');
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleCreate = async () => {
    if (!newTypeName.trim()) return;
    try {
      await createType(newTypeName);
      alert('Категория добавлена');
      setNewTypeName('');
      loadTypes();
    } catch (err) {
      alert('Ошибка создания');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить категорию?')) {
      try {
        await deleteType(id);
        alert('Категория удалена');
        loadTypes();
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
          placeholder="Название категории"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
        />
        <button onClick={handleCreate} className="btn btn-small">Добавить</button>
      </div>
      <ul className="admin-list">
        {types.map(t => (
          <li key={t.id}>
            <span>{t.name}</span>
            <button onClick={() => handleDelete(t.id)} className="text-red-500">удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTypes;