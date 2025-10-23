'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const NavBarShopping = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = 0; // Mock cart items count

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    // Add/remove noScroll class to prevent body scrolling when cart is open
    if (!isCartOpen) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
        </svg>
        <span className={`absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
          cartItems > 0 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          {cartItems}
        </span>
      </button>

      {/* Cart Drawer - Placeholder for now */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart}></div>
          <div className="relative ml-auto w-full max-w-md bg-white shadow-xl">
            <div className="p-4">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <p className="text-gray-500 mt-2">Your cart is empty</p>
              <button
                onClick={toggleCart}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarShopping;