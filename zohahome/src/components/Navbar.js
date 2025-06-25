import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/images/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

  const navLinks = [
    { path: '/', label: 'Kryefaqja' },
    { path: '/shop', label: 'Dyqani' },
    { path: '/visit-us', label: 'Na Vizitoni' },
    { path: '/about', label: 'Rreth Nesh' },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="Zoha's Home" className="h-10 w-10 mr-2" />
              <h1 className="text-2xl font-playfair text-olive-green">Zoha's Home</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-olive-green transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-olive-green transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
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
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-olive-green transition-colors duration-300"
                >
                  <span>{user?.firstName || user?.username}</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profili Im
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Porositë e Mia
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Çkyçu
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-olive-green transition-colors duration-300"
                >
                  Kyçu
                </Link>
                <Link
                  to="/register"
                  className="bg-olive-green text-white px-4 py-2 rounded-md hover:bg-olive-dark transition-colors duration-300"
                >
                  Regjistrohu
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-olive-green"
            >
              <svg
                className="h-6 w-6"
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
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-olive-green focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 text-gray-700 hover:text-olive-green hover:bg-soft-beige rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            {isAuthenticated() ? (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <p className="px-3 py-2 text-sm text-gray-500">
                    Mirëseerdhët, {user?.firstName || user?.username}
                  </p>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-olive-green hover:bg-soft-beige rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Profili Im
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 text-gray-700 hover:text-olive-green hover:bg-soft-beige rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Porositë e Mia
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-gray-700 hover:text-olive-green hover:bg-soft-beige rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-olive-green hover:bg-soft-beige rounded-md"
                  >
                    Çkyçu
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-olive-green hover:bg-soft-beige rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Kyçu
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 bg-olive-green text-white rounded-md hover:bg-olive-dark"
                  onClick={() => setIsOpen(false)}
                >
                  Regjistrohu
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 