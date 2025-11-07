'use client';

import React from 'react';
import { useAuthModal } from '../../context/AuthModalContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthModals: React.FC = () => {
  const { isLoginOpen, isRegisterOpen, closeModals, openLogin, openRegister } = useAuthModal();

  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        onSwitchToRegister={openRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeModals}
        onSwitchToLogin={openLogin}
      />
    </>
  );
};

export default AuthModals;