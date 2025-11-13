import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ECommerce from "@/components/Dashboard/E-commerce";
import RoleGuard from "@/components/Role/RoleGuard";

export default function AdminEcommercePage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Breadcrumb pageName="E-commerce" />
      <ECommerce />
    </RoleGuard>
  );
}
