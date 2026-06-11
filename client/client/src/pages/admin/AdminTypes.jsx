import { useState, useEffect } from 'react';
import { fetchTypes, createType, deleteType } from '../../api/types';

const AdminTypes = () => {
  const [types, setTypes] = useState([]);
  const [newName, setNewName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const load = async () => {
    const { data } = await fetchTypes();
    setTypes(data);
  };

  useEffect(() => { load(); }, []);

  const [isAdding, setIsAdding] = useState(false);

    const add = async () => {
        if (!newName.trim()) return;
        setIsAdding(true);
        try {
            await createType(newName);
            setNewName('');
            load();
            setTimeout(() => setIsAdding(false), 1500);
        } catch (err) {
            setIsAdding(false);
            alert('Ошибка добавления');
  }
};

  const del = async (id) => {
    if (window.confirm('Удалить категорию?')) {
      try {
        await deleteType(id);
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
          placeholder="Название категории"
        />
        <button onClick={add} className="btn btn-small" style={{ backgroundColor: isAdding ? '#22c55e' : '' }}>
  {isAdding ? 'Добавлено' : 'Добавить'}
</button>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ul className="admin-list">
        {types.map(t => (
          <li key={t.id}>
            <span>{t.name}</span>
            <button onClick={() => del(t.id)} className="delete-btn">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTypes;