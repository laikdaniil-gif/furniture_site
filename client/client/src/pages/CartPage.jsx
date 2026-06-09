import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/formatPrice';

const CartPage = () => {
  const { items, totalPrice, isLoading, fetchCart, removeItem, updateItemLocally } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = (cartProductId, newQuantity) => {
    if (newQuantity < 1) return;
    updateItemLocally(cartProductId, newQuantity);
  };

  const handleRemove = async (id) => {
    if (window.confirm('Удалить товар из корзины?')) {
      try {
        await removeItem(id);
      } catch (err) {
        alert('Ошибка удаления');
      }
    }
  };

  if (isLoading) return <Loader />;

  if (items.length === 0) {
    return (
      <div>
        <h2 className="section-title">Корзина</h2>
        <div className="cart-items">
          <div className="text-center">Корзина пуста</div>
          <div className="cart-actions">
            <Link to="/catalog" className="btn btn-primary">Перейти в каталог</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Корзина</h2>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item__info">
              <img
                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${item.product.img}`}
                alt={item.product.name}
                className="cart-item__img"
                onError={(e) => (e.target.src = 'https://placehold.co/600x400?text=Фурнитура')}
              />
              <div className="cart-item__details">
                <h4>{item.product.name}</h4>
                <p>{formatPrice(item.product.price)}</p>
              </div>
            </div>
            <div className="cart-item__controls">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                className="cart-quantity-input"
              />
              <button onClick={() => handleRemove(item.id)} className="cart-item__remove">
                🗑️ Удалить
              </button>
            </div>
            <div className="cart-item__total">{formatPrice(item.product.price * item.quantity)}</div>
          </div>
        ))}
      </div>
      <div className="cart-total">Итого: {formatPrice(totalPrice)}</div>
      <div className="cart-actions">
        <Link to="/checkout" className="btn btn-primary checkout-btn">Оформить заказ</Link>
      </div>
    </div>
  );
};

export default CartPage;