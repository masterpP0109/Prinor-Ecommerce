import React from 'react';
import Link from 'next/link';

const StoreFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Prinor</h3>
            <p className="text-gray-300 text-sm">
              Your trusted electronic shop for all your tech needs.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/list/pc-laptops" className="text-gray-300 hover:text-white">PC & Laptops</Link></li>
              <li><Link href="/list/smartphones" className="text-gray-300 hover:text-white">Smartphones</Link></li>
              <li><Link href="/list/tvs" className="text-gray-300 hover:text-white">TVs</Link></li>
              <li><Link href="/list/video-games" className="text-gray-300 hover:text-white">Gaming</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Info</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>Email: support@prinor.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Tech Street, Digital City</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Prinor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;