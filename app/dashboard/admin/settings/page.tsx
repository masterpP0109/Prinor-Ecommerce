import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function AdminSettingsPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Breadcrumb pageName="Settings" />
      <div className="p-4">Settings content coming soon.</div>
    </RoleGuard>
  );
}
