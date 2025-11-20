'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    if (user.role) {
      if (user.role === 'ADMIN' && user.isApproved) {
        router.push('/dashboard/admin');
      } else if (user.role === 'SELLER') {
        router.push('/dashboard/seller');
      } else if (user.role === 'BUYER') {
        router.push('/dashboard/buyer');
      } else {
        // Default to buyer if role not recognized
        router.push('/dashboard/buyer');
      }
    }
  }, [user, router]);

  if (!user) {
    return <div>Redirecting to sign in...</div>;
  }

  if (user.role === 'ADMIN' && !user.isApproved) {
    return <div>Your admin account is pending approval. Please wait for approval to access the dashboard.</div>;
  }

  return <div>Redirecting to your dashboard...</div>;
};

export default DashboardPage;