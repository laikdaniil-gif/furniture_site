import { useEffect, useState } from 'react';
import { getUserOrders } from '../api/orders';
import useAuthStore from '../store/useAuthStore';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/formatPrice';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;
    const loadOrders = async () => {
      try {
        const { data } = await getUserOrders(user.id);
        setOrders(data);
      } catch (err) {
        alert('Ошибка загрузки заказов');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [user, isAuthenticated]);

  if (loading) return <Loader />;

  if (orders.length === 0) {
    return <div className="text-center">У вас пока нет заказов</div>;
  }

  return (
    <div>
      <h2 className="section-title">Мои заказы</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card__header">
              <span>Заказ №{order.id}</span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="order-card__status">
              Статус: {
                order.status === 1 ? '🟡 Новый' :
                order.status === 2 ? '🟢 В обработке' :
                '✅ Доставлен'
              }
            </p>
            <p>Телефон: {order.phone} | Адрес: {order.address}</p>
            <p className="order-card__total">Сумма: {formatPrice(order.total || 0)}</p>
            <details>
              <summary>Состав заказа</summary>
              <ul>
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.productName} x {item.quantity} — {formatPrice(item.price * item.quantity)}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;