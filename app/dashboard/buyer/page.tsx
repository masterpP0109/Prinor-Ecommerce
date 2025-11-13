import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ECommerce from "@/components/Dashboard/E-commerce";
import RoleGuard from "@/components/Role/RoleGuard";

const BuyerPage = () => {
  return (
    <RoleGuard allowedRoles={["buyer"]}>
      <Breadcrumb pageName="Buyer Dashboard" />
      <ECommerce />
    </RoleGuard>
  );
};

export default BuyerPage;