'use client';

import React from 'react';

const HomeCategoryList = () => {
  const categories = [
    { name: "Electronics Products", link: "/store/products", icon: "computerIcon" },
    { name: "Software, Apps, Games", link: "/store/digital", icon: "otherCatIcon" },
    { name: "Web Design & Marketing Services", link: "/store/services", icon: "otherCatIcon" },
  ];

  return (
    <div className="w-72 bg-white shadow-lg rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Tech Nexus Categories</h3>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">
            <a href={category.link} className="flex items-center">
              <img
                src={`/icons/${category.icon}.svg`}
                alt={category.name}
                className="w-5 h-5 mr-3 opacity-70"
              />
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeCategoryList;