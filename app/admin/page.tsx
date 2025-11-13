'use client';

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";

const AdminPage = () => {
  return (
    <>
      <Breadcrumb pageName="Admin Dashboard" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-6">
          <CardDataStats title="Total Users" total="150" rate="+10%" levelUp>
            <svg className="w-6 h-6 text-meta-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
          </CardDataStats>
        </div>
        <div className="col-span-12 md:col-span-6">
          <CardDataStats title="Total Sales" total="$20,000" rate="-5%" levelDown>
            <svg className="w-6 h-6 text-meta-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
          </CardDataStats>
        </div>
        <div className="col-span-12">
          <ChartOne />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TableOne data={[]} role="admin" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TableTwo />
        </div>
      </div>
    </>
  );
};

export default AdminPage;