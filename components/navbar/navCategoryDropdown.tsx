'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Subcategory {
  name: string;
  tagline: string;
  link: string;
  icon: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface NavCategoryDropdownProps {
  category: Category;
}

const NavCategoryDropdown: React.FC<NavCategoryDropdownProps> = ({ category }) => {
  const [isActive, setIsActive] = useState(false);
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

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <button
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      >
        <span>{category.name}</span>
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
        <div className="absolute top-full left-0 mt-1 w-80 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-2">
            {category.subcategories.map((sub, index) => (
              <Link
                key={index}
                href={sub.link}
                className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-all duration-200 group"
                onClick={() => setIsActive(false)}
              >
                <div className="flex-shrink-0 mr-3">
                  <Image
                    src={`/icons/${sub.icon}.svg`}
                    alt={sub.name}
                    width={24}
                    height={24}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                    {sub.name}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    {sub.tagline}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavCategoryDropdown;