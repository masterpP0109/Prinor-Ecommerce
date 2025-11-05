'use client';

import React from 'react';

const HomeCategoryList = () => {
  return (
    <div className="w-72 bg-white shadow-lg rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Electronics</li>
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Clothing</li>
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Home & Garden</li>
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Sports</li>
        <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Books</li>
      </ul>
    </div>
  );
};

export default HomeCategoryList;