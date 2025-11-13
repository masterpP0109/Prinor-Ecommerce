import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function BuyerSettingsPage() {
  return (
    <RoleGuard allowedRoles={["buyer"]}>
      <Breadcrumb pageName="Settings" />
      <div className="p-4">Settings content coming soon.</div>
    </RoleGuard>
  );
}
