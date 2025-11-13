import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function SellerProductsPage() {
  return (
    <RoleGuard allowedRoles={["seller"]}>
      <Breadcrumb pageName="Products" />
      <div className="p-4">Products management coming soon.</div>
    </RoleGuard>
  );
}
