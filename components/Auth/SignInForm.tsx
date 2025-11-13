"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const SignInForm = ({ onSwitchToSignUp }: { onSwitchToSignUp?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const role = await login(email, password);
      // Role-based redirect
      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'seller') router.push('/dashboard/seller');
      else router.push('/dashboard/buyer');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8"
        >
          <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
          </div>

          <button
            type="button"
            onClick={() => console.log('Sign in with Google')}
            className="mt-4 w-full flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
          >
            <FcGoogle className="mr-2 text-xl" /> Sign in with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up →
            </button>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignInForm;
