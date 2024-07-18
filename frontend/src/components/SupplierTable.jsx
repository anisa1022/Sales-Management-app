import React from 'react';

const SupplierTable = ({ suppliers, handleEditSupplier, handleDeleteSupplier }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr className="bg-gray-900 text-white font-semibold">
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Contact</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Address</th>
          <th className="px-4 py-2 border">Update</th>
          <th className="px-4 py-2 border">Remove</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier._id} className="border-t">
            <td className="px-4 py-2 border">{supplier.name}</td>
            <td className="px-4 py-2 border">{supplier.contact}</td>
            <td className="px-4 py-2 border">{supplier.email}</td>
            <td className="px-4 py-2 border">{supplier.address}</td>
            <td className="px-4 py-2 border">
              <button
                className="bg-[#4A6FA5] text-white p-2 rounded"
                onClick={() => handleEditSupplier(supplier)}
              >
                EDIT
              </button>
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-[#A54A4A] text-white p-2 rounded"
                onClick={() => handleDeleteSupplier(supplier._id)}
              >
                DELETE
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SupplierTable;
