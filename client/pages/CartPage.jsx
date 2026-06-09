import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const CartPage = () => {
  const { items, totalPrice, fetchCart, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  if (items.length === 0) return <p>Корзина пуста</p>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <img src={`http://localhost:5000/static/${item.product.img}`} width="80" alt={item.product.name} />
          <h3>{item.product.name}</h3>
          <p>{item.product.price} ₽</p>
          <p>Кол-во: {item.quantity}</p>
          <button onClick={() => removeItem(item.id)}>Удалить</button>
        </div>
      ))}
      <hr />
      <p>Итого: {totalPrice} ₽</p>
      <Link to="/checkout">Оформить заказ</Link>
    </div>
  );
};