import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { BRAND } from "../../types/brand";

const TableTwo = () => {
  const { user } = useAuth();

  if (!user) return null;

  const data: BRAND[] = [
    {
      logo: "/path/to/logo1.png",
      name: "Brand A",
      visitors: 1200,
      revenues: "$3000",
      sales: 150,
      conversion: 12,
      roleAccess: "Admin",
    },
    {
      logo: "/path/to/logo2.png",
      name: "Brand B",
      visitors: 800,
      revenues: "$2000",
      sales: 100,
      conversion: 10,
      roleAccess: "Seller",
    },
    // Add more data as needed
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Logo</th>
            <th className="py-2 px-4 border-b">Brand Name</th>
            <th className="py-2 px-4 border-b">Visitors</th>
            <th className="py-2 px-4 border-b">Revenues</th>
            <th className="py-2 px-4 border-b">Sales</th>
            <th className="py-2 px-4 border-b">Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((brand, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                <img src={brand.logo} alt={brand.name} className="h-10" />
              </td>
              <td className="py-2 px-4 border-b">{brand.name}</td>
              <td className="py-2 px-4 border-b">{brand.visitors}</td>
              <td className="py-2 px-4 border-b">{brand.revenues}</td>
              <td className="py-2 px-4 border-b">{brand.sales}</td>
              <td className="py-2 px-4 border-b">{brand.conversion}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {user.role === "admin" && (
        <div className="mt-4">
          <button className="bg-primary text-white py-2 px-4 rounded">
            Add New Brand
          </button>
        </div>
      )}
    </div>
  );
};

export default TableTwo;
