'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const NavBarProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <button
        onClick={toggleProfile}
        className="relative flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Profile Dropdown - Placeholder for now */}
      {isProfileOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Orders
            </Link>
            <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarProfile;