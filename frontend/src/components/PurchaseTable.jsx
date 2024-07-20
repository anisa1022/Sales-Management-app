import React from 'react';

/**
 * PurchaseTable Component
 * @param {Array} purchases - List of purchases
 * @param {Function} handleEditPurchase - Function to handle editing a purchase
 * @param {Function} handleDeletePurchase - Function to handle deleting a purchase
 * @returns JSX Element
 */
const PurchaseTable = ({ purchases, handleEditPurchase, handleDeletePurchase }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr className="bg-gray-900 text-white font-semibold">
          <th className="px-4 py-2 border">Product</th>
          <th className="px-4 py-2 border">Supplier</th>
          <th className="px-4 py-2 border">Quantity</th>
          <th className="px-4 py-2 border">Total Price</th>
          <th className="px-4 py-2 border">Date</th>
          <th className="px-4 py-2 border">Update</th>
          <th className="px-4 py-2 border">Remove</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) => (
          <tr key={purchase._id} className="border-t">
            <td className="px-4 py-2 border">{purchase.product.name}</td>
            <td className="px-4 py-2 border">{purchase.supplier.name}</td>
            <td className="px-4 py-2 border">{purchase.quantity}</td>
            <td className="px-4 py-2 border">{purchase.totalPrice}</td>
            <td className="px-4 py-2 border">{new Date(purchase.date).toLocaleDateString()}</td>
            <td className="px-4 py-2 border">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleEditPurchase(purchase)}
              >
                EDIT
              </button>
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeletePurchase(purchase._id)}
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

export default PurchaseTable;
