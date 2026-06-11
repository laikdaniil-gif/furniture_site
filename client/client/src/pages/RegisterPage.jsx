// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const register = useAuthStore(state => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      await register(email, password, role);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      const message = err.response?.data?.message || 'Ошибка регистрации. Попробуйте другой email.';
      setError(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <Link to="/login" className="auth-tab">Вход</Link>
        <Link to="/register" className="auth-tab active">Регистрация</Link>
      </div>
      
      {success ? (
        <div style={{ textAlign: 'center', color: 'green', padding: '1rem' }}>
          Регистрация прошла успешно! Перенаправление...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль (минимум 6 символов)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-dark">Зарегистрироваться</button>
          {error && <div className="auth-message">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default RegisterPage;