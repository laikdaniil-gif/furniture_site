import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AdminRoute = () => {
  const user = useAuthStore(state => state.user);
  return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
};