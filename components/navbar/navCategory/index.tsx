'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  url: string;
  subcategories?: Category[];
}

const NavBarCategory = () => {
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    { _id: '1', name: 'PC & Laptops', url: 'pc-laptops', subcategories: [] },
    { _id: '2', name: 'Smartphones', url: 'smartphones', subcategories: [] },
    { _id: '3', name: 'TVs', url: 'tvs', subcategories: [] },
    { _id: '4', name: 'Gaming', url: 'video-games', subcategories: [] },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>All Categories</span>
        <svg
          className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isActive && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-2">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/list/${category.url}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsActive(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarCategory;