import React from 'react';
import { useAuth } from '../../context/AuthContext';

const RoleSwitcher = () => {
  const { user, setUserRole } = useAuth();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(event.target.value);
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
      <span className="font-semibold">Switch Role:</span>
      <select
        value={user.role}
        onChange={handleRoleChange}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="admin">Admin</option>
        <option value="seller">Seller</option>
        <option value="buyer">Buyer</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;