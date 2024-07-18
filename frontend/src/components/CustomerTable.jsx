import React from 'react';

/**
 * CustomerTable Component
 * @param {Array} customers - List of customers
 * @param {Function} handleEditCustomer - Function to handle editing a customer
 * @param {Function} handleDeleteCustomer - Function to handle deleting a customer
 * @returns JSX Element
 */
const CustomerTable = ({ customers, handleEditCustomer, handleDeleteCustomer }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr className="bg-gray-900 text-white font-semibold">
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Phone</th>
          <th className="px-4 py-2 border">State</th>
          <th className="px-4 py-2 border">City</th>
          <th className="px-4 py-2 border">District</th>
          <th className="px-4 py-2 border">Update</th>
          <th className="px-4 py-2 border">Remove</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer._id} className="border-t">
            <td className="px-4 py-2 border">{customer.name}</td>
            <td className="px-4 py-2 border">{customer.email}</td>
            <td className="px-4 py-2 border">{customer.phone}</td>
            <td className="px-4 py-2 border">{customer.address.state}</td>
            <td className="px-4 py-2 border">{customer.address.city}</td>
            <td className="px-4 py-2 border">{customer.address.district}</td>
            <td className="px-4 py-2 border">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleEditCustomer(customer)}
              >
                EDIT
              </button>
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeleteCustomer(customer._id)}
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

export default CustomerTable;
