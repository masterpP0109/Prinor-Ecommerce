import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function AdminUIPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Breadcrumb pageName="UI Components" />
      <div className="p-4">UI components coming soon.</div>
    </RoleGuard>
  );
}
