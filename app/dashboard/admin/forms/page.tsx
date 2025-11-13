import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function AdminFormsPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Breadcrumb pageName="Forms" />
      <div className="p-4">Forms content coming soon.</div>
    </RoleGuard>
  );
}
