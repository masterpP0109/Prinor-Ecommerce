'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../context/AuthContext';
import { AuthModalProvider } from '../context/AuthModalContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AuthModalProvider>
          {children}
        </AuthModalProvider>
      </AuthProvider>
    </SessionProvider>
  );
}