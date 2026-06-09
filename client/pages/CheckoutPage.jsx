import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import { createOrder } from '../api/orders';

const CheckoutPage = () => {
  const user = useAuthStore(state => state.user);
  const { fetchCart } = useCartStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: '', postcode: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrder(user.id, form.phone, form.postcode, form.address);
      await fetchCart(); // обновляем корзину (должна очиститься)
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert('Ошибка оформления заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Телефон"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Почтовый индекс"
        value={form.postcode}
        onChange={e => setForm({ ...form, postcode: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Адрес"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>Оформить</button>
    </form>
  );
};