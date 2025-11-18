'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

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

interface CartData {
  items: CartItem[];
  total: number;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartData>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCart();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdating(itemId);
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart data
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdating(itemId);
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart data
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setUpdating(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading cart...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-gray-400 mb-8">You need to be signed in to view your cart.</p>
          <Link
            href="/auth/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl mb-4">Your cart is empty</div>
            <Link
              href="/store"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image || '/images/default-product.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{item.product.name}</h3>
                      <p className="text-purple-400 font-bold">${item.product.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={updating === item.id}
                          className="px-3 py-2 text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-white border-x border-gray-700">
                          {updating === item.id ? '...' : item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updating === item.id}
                          className="px-3 py-2 text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      {/* Item Total */}
                      <div className="text-white font-semibold min-w-[80px] text-right">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating === item.id}
                        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 h-fit">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cart.items.length} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/store/checkout"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/store"
                className="w-full border border-gray-600 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center block mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}