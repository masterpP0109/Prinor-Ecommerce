"use client"
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";
import { useAuth } from "@/context/AuthContext";

export default function SellerProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "Seller User",
    email: "seller@example.com",
    password: "",
    storeName: "My Store",
  });
  const [message, setMessage] = useState("");
  const [requestForm, setRequestForm] = useState({
    reason: "",
  });
  const [requestMessage, setRequestMessage] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Profile updated (demo only)");
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestLoading(true);
    setRequestMessage("");

    try {
      const response = await fetch('/api/admin/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: requestForm.reason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      const data = await response.json();
      setRequestMessage("Admin access request submitted successfully! You will receive an email confirmation.");
      setRequestForm({ reason: "" });
    } catch (err) {
      setRequestMessage(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["seller"]}>
      <Breadcrumb pageName="Profile" />
      <form className="max-w-md bg-[#18132a] border border-[#7a3ff0] rounded-xl shadow-lg p-8 space-y-6 neon-glow" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#a14ff9]">Name</label>
          <input
            className="w-full bg-[#120e23] border border-[#7a3ff0] rounded px-3 py-2 text-white focus:ring-2 focus:ring-[#a14ff9] outline-none"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#a14ff9]">Email</label>
          <input
            className="w-full bg-[#120e23] border border-[#7a3ff0] rounded px-3 py-2 text-white focus:ring-2 focus:ring-[#a14ff9] outline-none"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#a14ff9]">Store Name</label>
          <input
            className="w-full bg-[#120e23] border border-[#7a3ff0] rounded px-3 py-2 text-white focus:ring-2 focus:ring-[#a14ff9] outline-none"
            name="storeName"
            value={form.storeName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#a14ff9]">Password</label>
          <input
            className="w-full bg-[#120e23] border border-[#7a3ff0] rounded px-3 py-2 text-white focus:ring-2 focus:ring-[#a14ff9] outline-none"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-[#7a3ff0] to-[#a14ff9] text-white font-bold py-2 px-4 rounded shadow-lg neon-glow transition hover:from-[#a14ff9] hover:to-[#7a3ff0]">
          Save Changes
        </button>
        {message && <div className="text-[#7afc8b] mt-2 font-semibold">{message}</div>}
      </form>

      {/* Admin Access Request Section */}
      {user?.role !== 'ADMIN' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-[#a14ff9]">Request Admin Access</h3>
          <form className="max-w-md bg-[#18132a] border border-[#7a3ff0] rounded-xl shadow-lg p-8 space-y-6 neon-glow" onSubmit={handleRequestSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#a14ff9]">Reason for requesting admin access (optional)</label>
              <textarea
                className="w-full bg-[#120e23] border border-[#7a3ff0] rounded px-3 py-2 text-white focus:ring-2 focus:ring-[#a14ff9] outline-none resize-none"
                name="reason"
                value={requestForm.reason}
                onChange={(e) => setRequestForm({ reason: e.target.value })}
                rows={4}
                placeholder="Please explain why you need admin access..."
              />
            </div>
            <button
              type="submit"
              disabled={requestLoading}
              className="w-full bg-gradient-to-r from-[#7a3ff0] to-[#a14ff9] text-white font-bold py-2 px-4 rounded shadow-lg neon-glow transition hover:from-[#a14ff9] hover:to-[#7a3ff0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {requestLoading ? 'Submitting...' : 'Request Admin Access'}
            </button>
            {requestMessage && (
              <div className={`mt-2 font-semibold ${requestMessage.includes('successfully') ? 'text-[#7afc8b]' : 'text-red-500'}`}>
                {requestMessage}
              </div>
            )}
          </form>
        </div>
      )}
    </RoleGuard>
  );
}
