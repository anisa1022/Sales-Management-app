
import React from 'react';

const UserTable = ({ users, handleEditUser, handleDeleteUser }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr className="bg-gray-900 text-white font-semibold">
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Role</th>
          <th className="px-4 py-2 border">Update</th>
          <th className="px-4 py-2 border">Remove</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="border-t">
            <td className="px-4 py-2 border">{user.name}</td>
            <td className="px-4 py-2 border">{user.email}</td>
            <td className="px-4 py-2 border">{user.role}</td>
            <td className="px-4 py-2 border">
              <button
                className="bg-[#4A6FA5] text-white p-2 rounded"
                onClick={() => handleEditUser(user)}
              >
                EDIT
              </button>
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-[#A54A4A] text-white p-2 rounded"
                onClick={() => handleDeleteUser(user._id)}
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

export default UserTable;
