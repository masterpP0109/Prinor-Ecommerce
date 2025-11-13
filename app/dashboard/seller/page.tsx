import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ECommerce from "@/components/Dashboard/E-commerce";
import RoleGuard from "@/components/Role/RoleGuard";

const SellerPage = () => {
  return (
    <RoleGuard allowedRoles={["seller"]}>
      <div className="min-h-screen bg-black text-white p-4">
        <Breadcrumb pageName="Seller Dashboard" />
        <ECommerce />
      </div>
    </RoleGuard>
  );
};

export default SellerPage;