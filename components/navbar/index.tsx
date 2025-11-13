'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBarCategory from './navCategory/index';
import NavCategoryDropdown from './navCategoryDropdown';
import NavBarFavorite from './navFavorite/index';
import NavBarProfile from './navProfile/index';
import NavBarShopping from './navShopping/index';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';


const MAIN_CATEGORIES = [
  {
    name: "Electronics Products",
    subcategories: [
      { name: "Computers", tagline: "High-performance desktops & workstations", link: "/list/pc-laptops/computer", icon: "computerIcon" },
      { name: "Laptops", tagline: "Portable computing solutions", link: "/list/pc-laptops/laptops", icon: "computerIcon" },
      { name: "Accessories", tagline: "Enhance your tech experience", link: "/list/accessories", icon: "pcComponentIcon" },
      { name: "Smart Devices", tagline: "IoT and smart home gadgets", link: "/list/smart-devices", icon: "phoneIcon" },
      { name: "Cameras", tagline: "Capture life's moments", link: "/list/photography/cameras", icon: "cameraIcon" },
    ],
  },
  {
    name: "Software, Apps, Games",
    subcategories: [
      { name: "Software", tagline: "Productivity and utility tools", link: "/store/digital/software", icon: "computerIcon" },
      { name: "Templates", tagline: "Design templates & resources", link: "/store/digital/templates", icon: "otherCatIcon" },
      { name: "Games", tagline: "Digital entertainment", link: "/store/digital/games", icon: "gameIcon" },
      { name: "Web Assets", tagline: "Website themes & graphics", link: "/store/digital/web-assets", icon: "otherCatIcon" },
      { name: "Tools", tagline: "Development and design tools", link: "/store/digital/tools", icon: "pcComponentIcon" },
    ],
  },
  {
    name: "Web Design, Web Development & Marketing Services",
    subcategories: [
      { name: "Web Development", tagline: "Build scalable websites & apps", link: "/store/services/web-development", icon: "computerIcon" },
      { name: "Graphic Design", tagline: "Creative visuals & brand identity", link: "/store/services/graphic-design", icon: "otherCatIcon" },
      { name: "Marketing", tagline: "Digital marketing & SEO", link: "/store/services/marketing", icon: "otherCatIcon" },
      { name: "IT Support", tagline: "Technical assistance & maintenance", link: "/store/services/it-support", icon: "computerIcon" },
      { name: "Repairs", tagline: "Hardware & software repairs", link: "/store/services/repairs", icon: "pcComponentIcon" },
      { name: "Tutoring", tagline: "Tech education & training", link: "/store/services/tutoring", icon: "otherCatIcon" },
      { name: "Consulting", tagline: "Expert advice & strategy", link: "/store/services/consulting", icon: "otherCatIcon" },
    ],
  },
];

const StoreNavBar = () => {


  return (
    <nav className="w-full z-50 bg-black pt-0 relative">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/images/logo.png" alt="TechNexus" width={125} height={40} />
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <NavBarFavorite />
            {/* Dashboard link visible when authenticated */}
            <AuthDashboardLink />
            <NavBarProfile />
            <NavBarShopping />
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="border-t border-b border-gray-700 mt-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <NavBarCategory />
              <div className="hidden lg:block w-px h-6 bg-gray-300"></div>
              <ul className="hidden lg:flex space-x-2">
                {MAIN_CATEGORIES.map((category) => (
                  <li key={category.name}>
                    <NavCategoryDropdown category={category} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Secondary Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="hidden lg:block text-sm text-gray-300 hover:text-white"
              >
                PC Configuration
              </Link>
              <Link
                href="/deals"
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                style={{ backgroundImage: 'url(/icons/discountIcon.svg)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', paddingLeft: '20px' }}
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

const AuthDashboardLink: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;
  const role = user.role || 'buyer';
  const href = role === 'admin' ? '/dashboard/admin' : role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer';
  return (
    <button
      onClick={() => router.push(href)}
      className="hidden sm:inline-block text-sm text-gray-300 hover:text-white"
    >
      Dashboard
    </button>
  );
};