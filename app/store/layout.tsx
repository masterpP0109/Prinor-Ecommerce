import React from 'react';
import AuthModals from '../../components/auth/AuthModals';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-600 min-h-screen">
      <main>{children}</main>
      <AuthModals />
    </div>
  );
}