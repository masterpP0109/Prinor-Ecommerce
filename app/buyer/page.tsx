import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const BuyerPage = () => {
  return (
    <>
      <Breadcrumb pageName="Buyer Dashboard" />
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold">Welcome to Your Dashboard</h2>
        <p>Product list and order history components to be implemented.</p>
      </div>
    </>
  );
};

export default BuyerPage;