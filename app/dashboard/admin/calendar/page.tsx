import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function AdminCalendarPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Breadcrumb pageName="Calendar" />
      <div className="p-4">Calendar content coming soon.</div>
    </RoleGuard>
  );
}
