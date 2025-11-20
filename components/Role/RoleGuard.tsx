'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  const userRoleUpper = user.role.toUpperCase();
  const allowedRolesUpper = allowedRoles.map(role => role.toUpperCase());
  if (!user || !user.role || !allowedRolesUpper.includes(userRoleUpper) || (userRoleUpper === 'ADMIN' && !user.isApproved)) {
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