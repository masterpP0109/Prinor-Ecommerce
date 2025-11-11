'use client';

import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import CartDrawer from '../../cart/CartDrawer';

const NavBarShopping = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

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
          totalItems > 0 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          {totalItems}
        </span>
      </button>

      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default NavBarShopping;