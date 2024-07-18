import React from 'react';

/**
 * SaleTable Component
 * @param {Array} sales - List of sales
 * @param {Function} handleEditSale - Function to handle editing a sale
 * @param {Function} handleDeleteSale - Function to handle deleting a sale
 * @returns JSX Element
 */
const SaleTable = ({ sales, handleEditSale, handleDeleteSale }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr className="bg-gray-900 text-white font-semibold">
          <th className="px-4 py-2 border">Product</th>
          <th className="px-4 py-2 border">Customer</th>
          <th className="px-4 py-2 border">Quantity</th>
          <th className="px-4 py-2 border">Total Price</th>
          <th className="px-4 py-2 border">Date</th>
          <th className="px-4 py-2 border">Update</th>
          <th className="px-4 py-2 border">Remove</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale._id} className="border-t">
            <td className="px-4 py-2 border">{sale.product.name}</td>
            <td className="px-4 py-2 border">{sale.customer.name}</td>
            <td className="px-4 py-2 border">{sale.quantity}</td>
            <td className="px-4 py-2 border">{sale.totalPrice}</td>
            <td className="px-4 py-2 border">{new Date(sale.date).toLocaleDateString()}</td>
            <td className="px-4 py-2 border">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleEditSale(sale)}
              >
                EDIT
              </button>
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeleteSale(sale._id)}
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

export default SaleTable;
