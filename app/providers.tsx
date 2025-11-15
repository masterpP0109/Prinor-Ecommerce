'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { AuthModalProvider } from '../context/AuthModalContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
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