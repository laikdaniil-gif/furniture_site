import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <div className="admin-tabs">
        <Link to="/admin/products" className="admin-tab">Товары</Link>
        <Link to="/admin/types" className="admin-tab">Категории</Link>
        <Link to="/admin/materials" className="admin-tab">Материалы</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;