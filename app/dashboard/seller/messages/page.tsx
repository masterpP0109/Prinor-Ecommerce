import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";

export default function SellerMessagesPage() {
  return (
    <RoleGuard allowedRoles={["seller"]}>
      <Breadcrumb pageName="Messages" />
      <div className="p-4">Messages coming soon.</div>
    </RoleGuard>
  );
}
