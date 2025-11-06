import React from 'react';
import StoreNavBar from '../../components/navbar/index';
import Footer from '../../components/layout/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-600 min-h-screen">
      <StoreNavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}