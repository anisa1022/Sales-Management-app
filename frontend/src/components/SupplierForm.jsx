// src/components/SupplierForm.js
import React from 'react';

/**
 * SupplierForm Component
 * @param {String} name - Supplier name
 * @param {String} contact - Supplier contact
 * @param {String} email - Supplier email
 * @param {String} address - Supplier address
 * @param {Function} setName - Function to set supplier name
 * @param {Function} setContact - Function to set supplier contact
 * @param {Function} setEmail - Function to set supplier email
 * @param {Function} setAddress - Function to set supplier address
 * @param {Function} handleAddSupplier - Function to handle adding/updating a supplier
 * @param {Boolean} showForm - Boolean to show/hide form
 * @param {Function} setShowForm - Function to set showForm state
 * @param {String} editSupplierId - ID of supplier being edited
 * @returns JSX Element
 */
const SupplierForm = ({
  name,
  contact,
  email,
  address,
  setName,
  setContact,
  setEmail,
  setAddress,
  handleAddSupplier,
  showForm,
  setShowForm,
  editSupplierId
}) => (
  <>
    {!showForm && (
      <button
        className="bg-gray-900 text-white font-semibold p-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        ADD SUPPLIER
      </button>
    )}
    {showForm && (
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="border p-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
          <button
            className="bg-gray-900 text-white font-semibold p-2 rounded w-full md:w-auto"
            onClick={handleAddSupplier}
          >
            {editSupplierId ? 'UPDATE SUPPLIER' : 'ADD SUPPLIER'}
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded w-full md:w-auto"
            onClick={() => {
              setShowForm(false);
              setEditSupplierId(null);
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    )}
  </>
);

export default SupplierForm;
