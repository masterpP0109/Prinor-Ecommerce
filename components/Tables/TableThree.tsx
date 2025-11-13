import React from "react";

interface TableThreeProps {
  userRole: string;
}

const TableThree: React.FC<TableThreeProps> = ({ userRole }) => {
  const data = [
    // Sample data for demonstration purposes
    { id: 1, name: "Product A", sales: 100, revenue: "$1000" },
    { id: 2, name: "Product B", sales: 200, revenue: "$2000" },
    { id: 3, name: "Product C", sales: 150, revenue: "$1500" },
  ];

  const renderTableRows = () => {
    return data.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.sales}</td>
        <td>{item.revenue}</td>
        {userRole === "admin" && (
          <td>
            <button className="text-primary">Edit</button>
            <button className="text-meta-5">Delete</button>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Sales</th>
            <th className="py-2 px-4 border-b">Revenue</th>
            {userRole === "admin" && <th className="py-2 px-4 border-b">Actions</th>}
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default TableThree;
