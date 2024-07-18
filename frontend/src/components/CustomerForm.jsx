import React from 'react';
const CustomerForm = ({
  name,
  email,
  phone,
  address,
  setName,
  setEmail,
  setPhone,
  setAddress,
  handleAddCustomer,
  showForm,
  setShowForm,
  editCustomerId
}) => (
  <>
    {!showForm && (
      <button
        className="bg-gray-900 text-white font-semibold p-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        ADD CUSTOMER
      </button>
    )}
    {showForm && (
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="District"
          value={address.district}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        />
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
          <button
            className="bg-gray-900 text-white font-semibold p-2 rounded w-full md:w-auto"
            onClick={handleAddCustomer}
          >
            {editCustomerId ? 'UPDATE CUSTOMER' : 'ADD CUSTOMER'}
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded w-full md:w-auto"
            onClick={() => {
              setShowForm(false);
              setEditCustomerId(null);
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    )}
  </>
);

export default CustomerForm;
