import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminTypes from './pages/Admin/AdminTypes';
import AdminMaterials from './pages/Admin/AdminMaterials';
import useAuthStore from './store/useAuthStore';

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<Navigate to="/admin/products" replace />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/types" element={<AdminTypes />} />
          <Route path="admin/materials" element={<AdminMaterials />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;