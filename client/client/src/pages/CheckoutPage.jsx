import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';

const CheckoutPage = () => {
  const [form, setForm] = useState({ phone: '', postcode: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const { fetchCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setButtonStatus('idle');
    try {
      await createOrder(form.phone, form.postcode, form.address);
      
      // Успех: меняем кнопку на зелёную с текстом "Заказ оформлен"
      setButtonStatus('success');
      await fetchCart(); // очищаем корзину
      
      // Через 2 секунды перенаправляем на страницу заказов
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Ошибка оформления заказа';
      setErrorMessage(msg);
      setButtonStatus('error');
      // Красное мигание кнопки на 1 секунду
      setTimeout(() => setButtonStatus('idle'), 1000);
    } finally {
      setLoading(false);
    }
  };

  // Определяем класс кнопки в зависимости от статуса
  const getButtonClass = () => {
    if (buttonStatus === 'success') return 'btn btn-success';
    if (buttonStatus === 'error') return 'btn btn-error';
    return 'btn btn-dark';
  };

  const getButtonText = () => {
    if (buttonStatus === 'success') return '✓ Заказ оформлен';
    if (loading) return 'Оформление...';
    return 'Подтвердить заказ';
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
          <button
            type="submit"
            className={getButtonClass()}
            disabled={loading || buttonStatus === 'success'}
            style={{
              transition: 'all 0.3s',
              width: '100%',
            }}
          >
            {getButtonText()}
          </button>
          {errorMessage && (
            <div className="error-message" style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;