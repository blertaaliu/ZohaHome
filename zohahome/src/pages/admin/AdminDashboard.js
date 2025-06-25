import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    } else {
      fetchStats();
    }
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await dashboardAPI.getStats();
      setStats(res.data);
    } catch (err) {
      setError('Nuk mund të ngarkohen statistikat');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin()) return null;

  return (
    <div className="pt-20 min-h-screen bg-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title mb-8">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-6 mb-8">
          <Link to="/admin/products" className="btn-primary">Produktet</Link>
          <Link to="/admin/orders" className="btn-primary">Porositë</Link>
          <Link to="/admin/users" className="btn-primary">Përdoruesit</Link>
        </div>
        {loading ? (
          <div className="text-center">Duke ngarkuar statistikat...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Produkte</h2>
              <p className="text-3xl font-bold text-olive-green">{stats.stats.totalProducts}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Porosi</h2>
              <p className="text-3xl font-bold text-olive-green">{stats.stats.totalOrders}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Përdorues</h2>
              <p className="text-3xl font-bold text-olive-green">{stats.stats.totalUsers}</p>
            </div>
            <Link to="/admin/products" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:bg-gray-50 transition">
              <span className="text-3xl mb-2">🛒</span>
              <span className="font-semibold">Menaxho Produktet</span>
            </Link>
          </div>
        ) : null}
        {/* You can add more analytics and charts here */}
      </div>
    </div>
  );
};

export default AdminDashboard; 