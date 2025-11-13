"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SignUpForm = ({ onSwitchToSignIn }: { onSwitchToSignIn?: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState(""); // optional
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const roleResult = await signUp({
        firstName,
        lastName,
        company: company || undefined,
        email,
        password,
        role,
      });

      // If signUp performed auto-login and returned a role, redirect to dashboard
      if (roleResult === 'admin') router.push('/dashboard/admin');
      else if (roleResult === 'seller') router.push('/dashboard/seller');
      else if (roleResult === 'buyer') router.push('/dashboard/buyer');
      else router.push('/auth/signin');
    } catch (err) {
      setError("Sign up failed. Please try again.");
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
          <h1 className="text-2xl font-semibold text-center mb-6">Create Your Account</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company (optional)
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-700" />
          </div>

          <button
            type="button"
            onClick={() => console.log("Sign up with Google")}
            className="mt-4 w-full flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
          >
            <FcGoogle className="mr-2 text-xl" /> Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-blue-600 hover:underline font-medium"
            >
              Click here to sign in →
            </button>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignUpForm;
