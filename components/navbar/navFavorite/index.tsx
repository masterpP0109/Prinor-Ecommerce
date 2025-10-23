'use client';

import React from 'react';
import Link from 'next/link';

const NavBarFavorite = () => {
  return (
    <Link href="/favorites" className="relative flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

export default NavBarFavorite;