import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, login, signUp, logout } = useAuthContext();

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isSeller = () => {
    return user?.role === 'seller';
  };

  const isBuyer = () => {
    return user?.role === 'buyer';
  };

  return {
    user,
    login,
    signUp,
    logout,
    isAuthenticated,
    isAdmin,
    isSeller,
    isBuyer,
  };
};