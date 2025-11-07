'use client';

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Modal from '../ui/modal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, recaptchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          onSwitchToLogin();
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
            <p className="text-green-400 text-sm">Account created successfully! Redirecting to login...</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              disabled={isLoading || success}
            />
          </div>
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setRecaptchaToken(token)}
              theme="dark"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || success || !recaptchaToken}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
          >
            {isLoading ? 'Creating Account...' : success ? 'Account Created!' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;