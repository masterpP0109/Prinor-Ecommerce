import React from "react";
import { BRAND } from "@/types/brand";

interface TableOneProps {
  data: BRAND[];
  role: "admin" | "seller" | "buyer";
}

const TableOne: React.FC<TableOneProps> = ({ data, role }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Logo</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Visitors</th>
            {role === "admin" && (
              <>
                <th className="border border-gray-300 p-2">Revenues</th>
                <th className="border border-gray-300 p-2">Sales</th>
                <th className="border border-gray-300 p-2">Conversion</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((brand) => (
            <tr key={brand.name}>
              <td className="border border-gray-300 p-2">
                <img src={brand.logo} alt={brand.name} className="h-10 w-10" />
              </td>
              <td className="border border-gray-300 p-2">{brand.name}</td>
              <td className="border border-gray-300 p-2">{brand.visitors}</td>
              {role === "admin" && (
                <>
                  <td className="border border-gray-300 p-2">{brand.revenues}</td>
                  <td className="border border-gray-300 p-2">{brand.sales}</td>
                  <td className="border border-gray-300 p-2">{brand.conversion}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOne;