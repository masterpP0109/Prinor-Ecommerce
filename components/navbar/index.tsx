'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBarCategory from './navCategory/index';
import NavBarFavorite from './navFavorite/index';
import NavBarProfile from './navProfile/index';
import NavBarShopping from './navShopping/index';

const STORE_SECTIONS = [
  { name: "Store", link: "/store/products" },
  { name: "Digital", link: "/store/digital" },
  { name: "Services", link: "/store/services" },
];

const NAVBAR_ITEMS = [
  { name: "Computer", link: "/list/pc-laptops/computer" },
  { name: "Laptop", link: "/list/pc-laptops/laptops" },
  { name: "Mobile", link: "/list/smartphones" },
  { name: "TV", link: "/list/tvs" },
  { name: "Gaming", link: "/list/video-games" },
  { name: "Camera", link: "/list/photography/cameras" },
  { name: "Tablet", link: "/list/tablets" },
  { name: "Watch", link: "/list/watches" },
];

const StoreNavBar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full z-10 bg-white pt-5 transition-all duration-700 ${
        hideNavbar ? 'top-[-180px]' : 'top-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.png" alt="BITEX" width={125} height={40} />
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <NavBarFavorite />
            <NavBarProfile />
            <NavBarShopping />
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="border-t border-b border-gray-200 mt-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <NavBarCategory />
              <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
              {/* Store Sections */}
              <ul className="hidden lg:flex space-x-2">
                {STORE_SECTIONS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
              <ul className="hidden lg:flex space-x-2">
                {NAVBAR_ITEMS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secondary Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="hidden lg:block text-sm text-gray-700 hover:text-gray-900"
              >
                PC Configuration
              </Link>
              <Link
                href="/deals"
                className="text-sm text-red-600 hover:text-red-700 flex items-center"
                style={{ backgroundImage: 'url(/discount-icon.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', paddingLeft: '20px' }}
              >
                Top Deals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StoreNavBar;