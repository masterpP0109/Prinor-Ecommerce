"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const adminLinks = [
    { href: '/dashboard/admin', label: 'Dashboard', icon: 'fas fa-home' },
    { href: '/dashboard/admin/ecommerce', label: 'E-commerce', icon: 'fas fa-shopping-cart' },
    { href: '/dashboard/admin/tables', label: 'Tables', icon: 'fas fa-table' },
    { href: '/dashboard/admin/charts', label: 'Charts', icon: 'fas fa-chart-bar' },
    { href: '/dashboard/admin/calendar', label: 'Calendar', icon: 'fas fa-calendar' },
    { href: '/dashboard/admin/forms', label: 'Forms', icon: 'fas fa-edit' },
    { href: '/dashboard/admin/profile', label: 'Profile', icon: 'fas fa-user' },
    { href: '/dashboard/admin/settings', label: 'Settings', icon: 'fas fa-cog' },
    { href: '/dashboard/admin/ui', label: 'UI Components', icon: 'fas fa-puzzle-piece' },
  ];

  const sellerLinks = [
    { href: '/dashboard/seller', label: 'Dashboard', icon: 'fas fa-home' },
    { href: '/dashboard/seller/products', label: 'Products', icon: 'fas fa-box' },
    { href: '/dashboard/seller/orders', label: 'Orders', icon: 'fas fa-shopping-bag' },
    { href: '/dashboard/seller/messages', label: 'Messages', icon: 'fas fa-envelope' },
    { href: '/dashboard/seller/settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  const buyerLinks = [
    { href: '/dashboard/buyer', label: 'Home', icon: 'fas fa-home' },
    { href: '/dashboard/buyer/orders', label: 'Orders', icon: 'fas fa-shopping-bag' },
    { href: '/dashboard/buyer/messages', label: 'Messages', icon: 'fas fa-envelope' },
    { href: '/dashboard/buyer/settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  const getLinks = () => {
    switch (user.role) {
      case 'admin':
        return adminLinks;
      case 'seller':
        return sellerLinks;
      case 'buyer':
        return buyerLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
  <div className="border-r border-[#7a3ff0] text-white w-64 min-h-screen p-6 flex flex-col neon-glow bg-gradient-to-b from-[#0b0b0f] via-[#18132a] to-[#18132a]">
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-[#a14ff9] tracking-wide drop-shadow">Dashboard</h2>
      </div>
      <nav className="flex-1">
        <ul>
          {links.map((link) => (
            <li key={link.href} className="mb-2">
              <Link
                href={link.href}
                className="flex items-center gap-3 p-2 rounded-lg transition bg-transparent hover:bg-[#22194a] hover:text-[#7a3ff0] focus:bg-[#22194a] focus:text-[#a14ff9] font-medium"
              >
                <i className={`${link.icon} text-[#a14ff9]`}></i>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {user.role === 'admin' && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4 text-[#7a3ff0] tracking-wide">Admin Controls</h3>
          <button className="w-full bg-gradient-to-r from-[#7a3ff0] to-[#a14ff9] text-white font-bold py-2 px-4 rounded-lg mb-2 neon-glow transition hover:from-[#a14ff9] hover:to-[#7a3ff0]">
            Manage Users
          </button>
          <button className="w-full bg-gradient-to-r from-[#7a3ff0] to-[#a14ff9] text-white font-bold py-2 px-4 rounded-lg mb-2 neon-glow transition hover:from-[#a14ff9] hover:to-[#7a3ff0]">
            Manage Sellers
          </button>
          <button className="w-full bg-gradient-to-r from-[#7a3ff0] to-[#a14ff9] text-white font-bold py-2 px-4 rounded-lg mb-2 neon-glow transition hover:from-[#a14ff9] hover:to-[#7a3ff0]">
            Transactions
          </button>
          <button className="w-full bg-gradient-to-r from-[#7a3ff0] to-[#a14ff9] text-white font-bold py-2 px-4 rounded-lg neon-glow transition hover:from-[#a14ff9] hover:to-[#7a3ff0]">
            Platform Analytics
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;