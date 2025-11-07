'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useAuthModal } from '../../../context/AuthModalContext';

const NavBarProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { openLogin } = useAuthModal();

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

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200">
                  <div className="font-medium">{user?.name || 'User'}</div>
                  <div className="text-gray-500">{user?.email}</div>
                </div>
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Orders
                </Link>
                <Link href="/auth/forgot-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Change Password
                </Link>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  openLogin();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarProfile;