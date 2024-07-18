// src/pages/ManageUsers.js
import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} from '../services/userSlice';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

function ManageUsers() {
  // Fetch users from the backend
  const { data: users = [], refetch } = useGetUsersQuery();

  // Mutation hooks to handle user CRUD operations
  const [registerUser] = useRegisterMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // State variables for user form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * Handle adding or updating a user
   */
  const handleAddUser = async () => {
    const userData = { name, email, role, password };
    try {
      if (editUserId) {
        await updateUser({ id: editUserId, data: userData });
        setEditUserId(null);
      } else {
        await registerUser(userData);
      }
      // Reset form fields
      setName('');
      setEmail('');
      setRole('');
      setPassword('');
      setShowForm(false); // Hide the form after submission
      refetch();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  /**
   * Handle editing a user
   * @param {Object} user - User object
   */
  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setPassword(''); // Do not set the password
    setEditUserId(user._id);
    setShowForm(true); // Show the form when editing
  };

  /**
   * Handle deleting a user
   * @param {String} id - User ID
   */
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className='flex'>
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6"> {/* Adjust margin to account for fixed navigation bars */}
        <h2 className="text-2xl font-bold mb-4">Users</h2>

        {/* User Form */}
        <UserForm
          name={name}
          email={email}
          role={role}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setRole={setRole}
          setPassword={setPassword}
          handleAddUser={handleAddUser}
          showForm={showForm}
          setShowForm={setShowForm}
          editUserId={editUserId}
        />
        {/* User Table */}
        <UserTable
          users={users}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default ManageUsers
