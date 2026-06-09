import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';

const CheckoutPage = () => {
  const [form, setForm] = useState({ phone: '', postcode: '', address: '' });
  const [loading, setLoading] = useState(false);
  const { fetchCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrder(form.phone, form.postcode, form.address);
      alert('Заказ успешно оформлен!');
      await fetchCart(); // обновляем корзину (она должна опустеть)
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Ошибка оформления заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="section-title">Оформление заказа</h2>
      <div className="checkout-form-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+7 999 123-45-67"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Почтовый индекс</label>
            <input
              type="text"
              name="postcode"
              required
              placeholder="123456"
              value={form.postcode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Адрес доставки</label>
            <input
              type="text"
              name="address"
              required
              placeholder="г. Москва, ул. Тверская, д.1"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? 'Оформление...' : 'Подтвердить заказ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;