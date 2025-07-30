import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);

  const categories = [
    { value: '', label: 'Të Gjitha' },
    { value: 'Dekor', label: 'Dekor' },
    { value: 'Kuzhina', label: 'Kuzhina' },
    { value: 'Banjo', label: 'Banjo' },
    { value: 'Dhoma', label: 'Dhoma' },
    { value: 'Kopsht', label: 'Kopsht' },
    { value: 'Të tjera', label: 'Të tjera' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Më të Rejat' },
    { value: 'price-low', label: 'Çmimi: Nga më i Uli' },
    { value: 'price-high', label: 'Çmimi: Nga më i Shtrenjti' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
      };
      
      const response = await productsAPI.getAll(params);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Gabim në ngarkimin e produkteve');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleWishlist = (product) => {
    if (!wishlist.includes(product._id)) {
      setWishlist([...wishlist, product._id]);
      toast.success('U shtua në të preferuarat!');
    } else {
      setWishlist(wishlist.filter(id => id !== product._id));
      toast('U hoq nga të preferuarat.');
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-soft-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Duke ngarkuar produktet...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center mb-12">Dyqani Ynë</h1>

          {/* Filters and Search */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Kërko produkte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-green focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-green focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-green focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nuk u gjetën produkte
              </h3>
              <p className="text-gray-600">
                Provoni të ndryshoni filtrat ose kërkimin tuaj.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 relative"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlist(product)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-pastel-pink transition-colors duration-200 border border-gray-200 ${wishlist.includes(product._id) ? 'text-pastel-pink' : 'text-gray-400'}`}
                    aria-label={wishlist.includes(product._id) ? 'Hiq nga të preferuarat' : 'Shto në të preferuarat'}
                  >
                    <FaHeart />
                  </button>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </Link>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-olive-green mb-3">
                      €{product.price.toFixed(2)}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {product.stock > 0 ? `${product.stock} në stok` : 'Jashtë stokit'}
                      </span>
                      
                      <div className="flex space-x-2 mt-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="px-3 py-1 text-sm border border-olive-green text-olive-green rounded hover:bg-gold hover:text-white transition-colors duration-200"
                          aria-label="Shiko produktin"
                        >
                          Shiko
                        </Link>
                        
                        {product.stock > 0 && (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-3 py-1 text-sm bg-olive-green text-white rounded hover:bg-olive-dark transition-colors duration-200 shadow-sm"
                            aria-label="Shto në shportë"
                          >
                            Shto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Shop; 