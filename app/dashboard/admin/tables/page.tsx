import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function AdminTablesPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Breadcrumb pageName="Tables" />
      <div className="p-4">Tables content coming soon.</div>
    </RoleGuard>
  );
}
