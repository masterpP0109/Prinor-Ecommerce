'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';
import { AuthModalProvider } from '../context/AuthModalContext';
import { CartProvider } from '../context/CartContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AuthModalProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthModalProvider>
      </AuthProvider>
    </SessionProvider>
  );
}