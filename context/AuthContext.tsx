'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  password: string;
  role: string;
  isApproved?: boolean;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      // ignore
    }
  }, []);

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

    // Update user state
    if (data?.user) {
      const [firstName, ...lastNameParts] = (data.user.name || '').split(' ');
      const lastName = lastNameParts.join(' ');
      const newUser: User = {
        firstName: firstName || '',
        lastName: lastName || '',
        email: data.user.email,
        password: '',
        role: data.user.role,
        isApproved: data.user.isApproved || false,
      };
      setUser(newUser);
      try {
        localStorage.setItem('authUser', JSON.stringify(newUser));
      } catch (e) {
        // ignore
      }
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

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    } catch (e) {
      // ignore
    }
  };

  const setUserRole = (role: string) => {
    setUser((prev) => prev ? { ...prev, role } : null);
  };

  const value = {
    user,
    isLoading: false,
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