import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ECommerce from "@/components/Dashboard/E-commerce";
import RoleGuard from "@/components/Role/RoleGuard";

const AdminPage = () => {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-[#7a3ff0] to-[#a14ff9] text-white p-4" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"%3E%3Cdefs%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.05\"/%3E%3C/svg%3E')" }}>
        <Breadcrumb pageName="Admin Dashboard" />
        <ECommerce />
      </div>
    </RoleGuard>
  );
};

export default AdminPage;