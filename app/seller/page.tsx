'use client';

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";

const SellerPage = () => {
  return (
    <>
      <Breadcrumb pageName="Seller Dashboard" />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-6">
          <CardDataStats title="Total Sales" total="$10,000" rate="+5%" levelUp>
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" />
            </svg>
          </CardDataStats>
        </div>

        <div className="col-span-12 md:col-span-6">
          <CardDataStats title="Total Products" total="50" rate="-2%" levelDown>
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a1 1 0 01-1-1v-6H3a1 1 0 110-2h6V3a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 01-1 1z" />
            </svg>
          </CardDataStats>
        </div>

        <div className="col-span-12">
          <ChartOne />
        </div>

        <div className="col-span-12 md:col-span-6">
          <TableOne data={[]} role="seller" />
        </div>

        <div className="col-span-12 md:col-span-6">
          <TableTwo />
        </div>
      </div>
    </>
  );
};

export default SellerPage;