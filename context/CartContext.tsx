'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  refreshCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'error' | 'info'}>>([]);
  const [notificationIdCounter, setNotificationIdCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${notificationIdCounter}-${Math.floor(Math.random() * 1e6)}`;
    setNotificationIdCounter(prev => prev + 1);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  const refreshCart = async () => {
    if (status !== 'authenticated') {
      setCartItems([]);
      return;
    }

    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []);
      } else {
        console.error('Failed to fetch cart');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    }
  };

  const addToCart = async (productId: string) => {
    if (status !== 'authenticated') {
      showNotification('Please sign in to add items to cart', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        await refreshCart();
        showNotification('Item added to cart!', 'success');
      } else {
        const error = await response.json();
        showNotification(error.error || 'Failed to add item to cart', 'error');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Failed to add item to cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (status !== 'authenticated') return;

    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        await refreshCart();
        showNotification('Item removed from cart', 'success');
      } else {
        showNotification('Failed to remove item from cart', 'error');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      showNotification('Failed to remove item from cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (status !== 'authenticated') return;

    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      });

      if (response.ok) {
        await refreshCart();
      } else {
        showNotification('Failed to update quantity', 'error');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      showNotification('Failed to update quantity', 'error');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (status === 'authenticated') {
      refreshCart();
    } else if (status === 'unauthenticated') {
      setCartItems([]);
    }
  }, [status]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        showNotification,
        refreshCart,
        loading,
      }}
    >
      {children}
      {/* Render notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="animate-in slide-in-from-top-2 duration-300 bg-gray-900/95 backdrop-blur-sm text-white px-6 py-4 rounded-lg shadow-lg border border-gray-700 max-w-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
};