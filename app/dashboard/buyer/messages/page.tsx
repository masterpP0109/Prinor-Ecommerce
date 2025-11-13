import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function BuyerMessagesPage() {
  return (
    <RoleGuard allowedRoles={["buyer"]}>
      <Breadcrumb pageName="Messages" />
      <div className="p-4">Messages coming soon.</div>
    </RoleGuard>
  );
}
