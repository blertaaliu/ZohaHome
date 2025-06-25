import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import VisitUs from './pages/VisitUs';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-soft-beige">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/visit-us" element={<VisitUs />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<div className='pt-20 text-center'>Menaxho Porositë (placeholder)</div>} />
                <Route path="/admin/users" element={<div className='pt-20 text-center'>Menaxho Përdoruesit (placeholder)</div>} />
              </Routes>
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
