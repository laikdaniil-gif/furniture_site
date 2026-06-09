import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import { useEffect } from 'react';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { totalCount, fetchCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated, fetchCart]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <Link to="/" className="logo"><i className="fas fa-tools"></i> WoodenMaster</Link>
            <nav className="nav">
              <Link to="/" className="nav-link">Главная</Link>
              <Link to="/catalog" className="nav-link">Каталог</Link>
              <Link to="/cart" className="nav-link cart-link">
                Корзина {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
              </Link>
              {isAuthenticated && <Link to="/orders" className="nav-link">Заказы</Link>}
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="nav-link">Войти</Link>
                  <Link to="/register" className="nav-link">Регистрация</Link>
                </>
              ) : (
                <>
                  {user?.role === 'ADMIN' && <Link to="/admin" className="nav-link admin-link">Админ</Link>}
                  <button onClick={handleLogout} className="nav-link">Выйти</button>
                </>
              )}
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className={`mobile-menu ${!mobileMenuOpen && 'hidden'}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Главная</Link>
            <Link to="/catalog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Каталог</Link>
            <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Корзина</Link>
            {isAuthenticated && <Link to="/orders" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Заказы</Link>}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Войти</Link>
                <Link to="/register" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Регистрация</Link>
              </>
            ) : (
              <>
                {user?.role === 'ADMIN' && <Link to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Админ</Link>}
                <button onClick={handleLogout} className="nav-link bg-transparent border-none cursor-pointer">Выйти</button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="container">© 2025 ФУРНИТУРА.ПРО — API-интеграция</div>
      </footer>
    </>
  );
};

export default Layout;