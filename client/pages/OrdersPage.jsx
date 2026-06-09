import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { fetchUserOrders } from '../api/orders';

const OrdersPage = () => {
  const user = useAuthStore(state => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.id).then(res => setOrders(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>Мои заказы</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p>Заказ №{order.id}</p>
          <p>Статус: {order.status}</p>
          <p>Телефон: {order.phone}</p>
          <p>Адрес: {order.address}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};