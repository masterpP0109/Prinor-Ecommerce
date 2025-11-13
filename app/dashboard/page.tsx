import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import RoleGuard from "@/components/Role/RoleGuard";
import ECommerce from "@/components/Dashboard/E-commerce";

const DashboardPage = () => {
  return (
    <RoleGuard allowedRoles={["admin", "seller", "buyer"]}>
      <Breadcrumb pageName="Dashboard" />
      <ECommerce />
    </RoleGuard>
  );
};

export default DashboardPage;