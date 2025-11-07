'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as any).id || '',
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user as any).role,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const value = {
    user,
    isLoading: status === 'loading',
    isAuthenticated: !!user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};