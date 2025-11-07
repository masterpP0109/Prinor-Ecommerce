import React from 'react';
import StoreNavBar from '../../components/navbar/index';
import Footer from '../../components/layout/Footer';
import { Providers } from '../../components/providers';
import AuthModals from '../../components/auth/AuthModals';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="bg-gray-600 min-h-screen">
        <StoreNavBar />
        <main>{children}</main>
        <Footer />
        <AuthModals />
      </div>
    </Providers>
  );
}