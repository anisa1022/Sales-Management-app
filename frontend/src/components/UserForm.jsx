
import React from 'react';

const UserForm = ({
  name,
  email,
  role,
  password,
  setName,
  setEmail,
  setRole,
  setPassword,
  handleAddUser,
  showForm,
  setShowForm,
  editUserId
}) => (
  <>
    {!showForm && (
      <button
        className="bg-gray-900 text-white font-semibold p-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        ADD USER
      </button>
    )}
    {showForm && (
      <div className="mb-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-2">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="border p-2 flex-1"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 flex-1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-gray-900 text-white font-semibold p-2 rounded"
          onClick={handleAddUser}
        >
          {editUserId ? 'UPDATE USER' : 'ADD USER'}
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => {
            setShowForm(false);
            setEditUserId(null);
          }}
        >
          CANCEL
        </button>
      </div>
    )}
  </>
);

export default UserForm;
