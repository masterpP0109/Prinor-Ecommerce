'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  password: string;
  role: string;
}


interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  signUp: (data: {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<string | undefined>;
  logout: () => void;
  setUserRole: (role: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  firstName: (session.user as any).firstName ?? '',
  lastName: (session.user as any).lastName ?? '',
  company: (session.user as any).company ?? '',
  email: session.user.email ?? '',
  password: '', // optional placeholder
  role: (session.user as any).role ?? 'user',
});

    } else {
      setUser(null);
    }
  }, [session]);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.message || 'Login failed');
    }
    const data = await response.json();

    // Persist token if provided
    if (data?.token) {
      try {
        localStorage.setItem('authToken', data.token);
      } catch (e) {
        // ignore
      }
    }

    // Update minimal user state if role present
    if (data?.user?.role) {
      setUser((prev) => ({
        ...(prev ?? { firstName: '', lastName: '', email: '', password: '', role: data.user.role }),
        role: data.user.role,
        email,
      } as any));
    }

    // Return role for the caller to decide redirect behavior
    return data?.user?.role as string | undefined;
  };

  const signUp = async (data: {
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Try to parse error message from response
      let message = 'Sign up failed';
      try {
        const json = await response.json();
        if (json?.message || json?.error) message = json.message || json.error;
      } catch (e) {
        // ignore parse errors
      }
      throw new Error(message);
    }

    // After successful registration, try to log the user in automatically
    try {
      const role = await login(data.email, data.password);
      return role;
    } catch (e) {
      // If auto login fails, just return undefined and let caller handle redirect to signin
      return undefined;
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const setUserRole = (role: string) => {
    setUser((prev) => prev ? { ...prev, role } : null);
  };

  const value = {
    user,
    isLoading: status === 'loading',
    isAuthenticated: !!user,
    login,
    signUp,
    logout,
    setUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};