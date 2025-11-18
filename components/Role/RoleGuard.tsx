'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !user.role || !allowedRoles.includes(user.role.toUpperCase()) || (user.role.toUpperCase() === 'ADMIN' && !user.isApproved)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">You do not have access to this dashboard</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;