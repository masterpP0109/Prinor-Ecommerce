'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
};

export default RoleGuard;