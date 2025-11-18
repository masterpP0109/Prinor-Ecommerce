'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isApproved: boolean;
}

interface AdminRequest {
  id: string;
  reason: string | null;
  status: string;
  requestedAt: string;
  user: User;
  reviewer?: {
    name: string | null;
    email: string;
  } | null;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'requests'>('users');

  useEffect(() => {
    fetchUsers();
    fetchRequests();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/admin/requests');
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(data.requests);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  const updateUserRole = async (userId: string, role: string, isApproved: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, isApproved }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      // Refresh users list
      await fetchUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const reviewRequest = async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/admin/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to review request');
      }

      // Refresh both lists
      await fetchUsers();
      await fetchRequests();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="min-h-screen bg-gradient-to-br from-[#7a3ff0] to-[#a14ff9] text-white p-4">
          <Breadcrumb pageName="User Management" />
          <div>Loading...</div>
        </div>
      </RoleGuard>
    );
  }

  if (error) {
    return (
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="min-h-screen bg-gradient-to-br from-[#7a3ff0] to-[#a14ff9] text-white p-4">
          <Breadcrumb pageName="User Management" />
          <div className="text-red-500">Error: {error}</div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-gradient-to-br from-[#7a3ff0] to-[#a14ff9] text-white p-4">
        <Breadcrumb pageName="User Management" />

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'users'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'requests'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Admin Requests ({requests.filter(r => r.status === 'PENDING').length})
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          {activeTab === 'users' ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-white/20">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Approved</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/20">
                        <td className="px-4 py-2">{user.name || 'N/A'}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.id, e.target.value, user.isApproved)}
                            className="bg-white/20 text-white rounded px-2 py-1"
                          >
                            <option value="BUYER">Buyer</option>
                            <option value="SELLER">Seller</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            checked={user.isApproved}
                            onChange={(e) => updateUserRole(user.id, user.role, e.target.checked)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => updateUserRole(user.id, user.role, user.isApproved)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Admin Access Requests</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-white/20">
                      <th className="px-4 py-2 text-left">User</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Reason</th>
                      <th className="px-4 py-2 text-left">Requested</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id} className="border-b border-white/20">
                        <td className="px-4 py-2">{request.user.name || 'N/A'}</td>
                        <td className="px-4 py-2">{request.user.email}</td>
                        <td className="px-4 py-2">{request.reason || 'No reason provided'}</td>
                        <td className="px-4 py-2">{new Date(request.requestedAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            request.status === 'PENDING' ? 'bg-yellow-500' :
                            request.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          {request.status === 'PENDING' ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => reviewRequest(request.id, 'APPROVED')}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => reviewRequest(request.id, 'REJECTED')}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              {request.reviewer ? `By ${request.reviewer.name || request.reviewer.email}` : 'N/A'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminUsersPage;