'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthModalContextType {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModals: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

interface AuthModalProviderProps {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        openLogin,
        openRegister,
        closeModals,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};