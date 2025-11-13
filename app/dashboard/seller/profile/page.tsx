"use client"
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function SellerProfilePage() {
  const [form, setForm] = useState({
    name: "Seller User",
    email: "seller@example.com",
    password: "",
    storeName: "My Store",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Profile updated (demo only)");
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
    </RoleGuard>
  );
}
