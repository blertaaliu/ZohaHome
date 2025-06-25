import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast.error(`Vetëm ${product.stock} copë të disponueshme`);
          return prevCart;
        }
        
        toast.success(`${quantity} copë u shtuan në shportë`);
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantity > product.stock) {
          toast.error(`Vetëm ${product.stock} copë të disponueshme`);
          return prevCart;
        }
        
        toast.success(`${quantity} copë u shtuan në shportë`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item._id === productId);
      if (item) {
        toast.success(`${item.name} u hoq nga shporta`);
      }
      return prevCart.filter(item => item._id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item._id === productId);
      if (!item) return prevCart;

      if (quantity <= 0) {
        toast.success(`${item.name} u hoq nga shporta`);
        return prevCart.filter(item => item._id !== productId);
      }

      if (quantity > item.stock) {
        toast.error(`Vetëm ${item.stock} copë të disponueshme`);
        return prevCart;
      }

      return prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Shporta u pastrua');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItems = () => {
    return cart;
  };

  const isInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cart,
    loading,
    setLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartItems,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 