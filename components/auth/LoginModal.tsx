'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Modal from '../ui/modal';
import { FcGoogle } from 'react-icons/fc';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // ✅ Use NextAuth credentials provider to sign in
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) throw new Error(result.error);
  onClose();
  // If provider returned user role info, redirect accordingly
  // result might not contain role; fallback to reloading and /dashboard
  const role = (result as any)?.user?.role as string | undefined;
  if (role === 'admin') window.location.href = '/dashboard/admin';
  else if (role === 'seller') window.location.href = '/dashboard/seller';
  else if (role === 'buyer') window.location.href = '/dashboard/buyer';
  else window.location.reload(); // Refresh session state
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={isLoading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => console.log('Login with Google')}
          className="mt-4 w-full flex items-center justify-center border border-gray-600 rounded-md py-3 hover:bg-gray-800 text-white transition-colors duration-200"
        >
          <FcGoogle className="mr-2 text-xl" /> Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don’t have an account?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign Up →
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
