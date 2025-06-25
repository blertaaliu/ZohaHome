import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-soft-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="section-title mb-8">Shporta Juaj</h1>
            <div className="bg-white rounded-lg shadow-md p-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Shporta juaj është bosh</h3>
              <p className="mt-2 text-gray-500">Filloni të blini për të shtuar produkte në shportë.</p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-olive-green hover:bg-olive-dark"
                >
                  Shko te Dyqani
                </Link>
              </div>
            </div>
          </motion.div>
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
        >
          <h1 className="section-title mb-8">Shporta Juaj</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Produktet ({cart.length})</h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Pastro Shportën
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-lg font-semibold text-olive-green">
                            €{item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Hiq
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Përmbledhje e Porosisë</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nëntotali:</span>
                    <span className="font-medium">€{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transporti:</span>
                    <span className="font-medium">€5.00</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Totali:</span>
                      <span className="text-lg font-semibold text-olive-green">
                        €{(getCartTotal() + 5).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {isAuthenticated() ? (
                  <Link
                    to="/checkout"
                    className="w-full bg-olive-green text-white py-3 px-4 rounded-md hover:bg-olive-dark transition-colors duration-200 text-center block"
                  >
                    Vazhdo me Blerjen
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 text-center">
                      Duhet të jeni të kyçur për të vazhduar
                    </p>
                    <Link
                      to="/login"
                      className="w-full bg-olive-green text-white py-3 px-4 rounded-md hover:bg-olive-dark transition-colors duration-200 text-center block"
                    >
                      Kyçu
                    </Link>
                    <Link
                      to="/register"
                      className="w-full border border-olive-green text-olive-green py-3 px-4 rounded-md hover:bg-olive-green hover:text-white transition-colors duration-200 text-center block"
                    >
                      Regjistrohu
                    </Link>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <Link
                    to="/shop"
                    className="text-sm text-olive-green hover:text-olive-dark"
                  >
                    Vazhdo Blerjen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart; 