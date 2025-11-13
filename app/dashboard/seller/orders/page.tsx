import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function SellerOrdersPage() {
  return (
    <RoleGuard allowedRoles={["seller"]}>
      <Breadcrumb pageName="Orders" />
      <div className="p-4">Orders management coming soon.</div>
    </RoleGuard>
  );
}
