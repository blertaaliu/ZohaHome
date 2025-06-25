import React, { useEffect, useState } from 'react';
import { productsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const initialForm = {
  name: '',
  description: '',
  price: '',
  category: 'Dekor',
  stock: 1,
  images: [],
};

const categories = [
  'Dekor',
  'Kuzhina',
  'Banjo',
  'Dhoma',
  'Kopsht',
  'Të tjera',
];

const AdminProducts = () => {
  const { isAdmin, user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Debug: Check authentication status
    console.log('User:', user);
    console.log('Is Admin:', isAdmin());
    console.log('Token:', token);
    
    if (isAdmin()) fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productsAPI.getAll();
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error('Nuk mund të ngarkohen produktet');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('stock', form.stock);
      imageFiles.forEach((file) => formData.append('images', file));

      await productsAPI.create(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Produkti u shtua me sukses!');
      setShowForm(false);
      setForm(initialForm);
      setImageFiles([]);
      fetchProducts();
    } catch (err) {
      console.error('Backend error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || err.message || 'Gabim gjatë shtimit të produktit';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAdmin()) return <div className="pt-20 text-center">Vetëm adminët mund të shohin këtë faqe.</div>;

  return (
    <div className="pt-20 min-h-screen bg-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="section-title">Menaxho Produktet</h1>
          <button
            className="btn-primary"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? 'Mbyll' : 'Shto Produkt'}
          </button>
        </div>

        {showForm && (
          <form
            className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleAddProduct}
            encType="multipart/form-data"
          >
            <div>
              <label className="block mb-2 font-medium">Emri</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2 font-medium">Përshkrimi</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2 font-medium">Çmimi (€)</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <label className="block mb-2 font-medium">Stoku</label>
              <input
                name="stock"
                type="number"
                min="1"
                value={form.stock}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Kategoria</label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <label className="block mb-2 font-medium">Imazhet</label>
              <input
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full mt-4"
              >
                {submitting ? 'Duke shtuar...' : 'Shto Produktin'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center">Duke ngarkuar produktet...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2">Emri</th>
                  <th className="px-4 py-2">Kategoria</th>
                  <th className="px-4 py-2">Çmimi</th>
                  <th className="px-4 py-2">Stoku</th>
                  <th className="px-4 py-2">Imazhi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">€{product.price}</td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2">
                      {product.images && product.images[0] && (
                        <img
                          src={`http://localhost:5000${product.images[0]}`}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts; 