import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../api/orders';
import Loader from '../../components/Loader';
import { formatPrice } from '../../utils/formatPrice';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data } = await getAllOrders();
      setOrders(data);
    } catch (err) {
      alert('Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert('Статус заказа обновлён');
      loadOrders();
    } catch (err) {
      alert('Ошибка обновления статуса');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Удалить заказ? Это действие необратимо.')) {
      try {
        await deleteOrder(orderId);
        alert('Заказ удалён');
        loadOrders();
      } catch (err) {
        alert('Ошибка удаления заказа');
      }
    }
  };

  const activeOrders = orders.filter(order => order.status !== 3);
  const archivedOrders = orders.filter(order => order.status === 3);
  const displayedOrders = activeTab === 'active' ? activeOrders : archivedOrders;

  if (loading) return <Loader />;

  return (
    <div>
      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
          Активные заказы ({activeOrders.length})
        </button>
        <button className={`admin-tab ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => setActiveTab('archived')}>
          Архив ({archivedOrders.length})
        </button>
      </div>
      <div className="orders-list">
        {displayedOrders.length === 0 && <div className="text-center">Нет заказов в этой категории</div>}
        {displayedOrders.map(order => {
          const total = order.order_products?.reduce((sum, op) => sum + op.priceAtPurchase * op.quantity, 0) || 0;
          return (
            <div key={order.id} className="order-card">
              <div className="order-card__header">
                <span>Заказ №{order.id}</span>
                <span>Пользователь ID: {order.userId}</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
                <button onClick={() => handleDelete(order.id)} className="delete-order-btn">🗑️ Удалить</button>
              </div>
              <p>Телефон: {order.phone} | Адрес: {order.addressee}</p>
              <p>Статус:
                <select value={order.status} onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}>
                  <option value={1}>🟡 Новый</option>
                  <option value={2}>🟢 В обработке</option>
                  <option value={3}>✅ Доставлен</option>
                </select>
              </p>
              <p>Сумма: {formatPrice(total)}</p>
              <details>
                <summary>Состав заказа</summary>
                <ul>
                  {order.order_products?.map(op => (
                    <li key={op.id}>{op.product?.name} x {op.quantity} — {formatPrice(op.priceAtPurchase * op.quantity)}</li>
                  ))}
                </ul>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrders;