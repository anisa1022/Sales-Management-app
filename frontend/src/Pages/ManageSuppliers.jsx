// src/pages/ManageSuppliers.js
import React, { useState } from 'react';
import {
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation
} from '../services/supplierSlice';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import SupplierTable from '../components/SupplierTable';
import SupplierForm from '../components/SupplierForm';

function ManageSuppliers() {
  // Fetch suppliers from the backend
  const { data: suppliers = [], refetch } = useGetSuppliersQuery();

  // Mutation hooks to handle supplier CRUD operations
  const [addSupplier] = useAddSupplierMutation();
  const [updateSupplier] = useUpdateSupplierMutation();
  const [deleteSupplier] = useDeleteSupplierMutation();

  // State variables for supplier form fields
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * Handle adding or updating a supplier
   */
  const handleAddSupplier = async () => {
    const supplierData = { name, contact, email, address };
    try {
      if (editSupplierId) {
        await updateSupplier({ id: editSupplierId, data: supplierData });
        setEditSupplierId(null);
      } else {
        await addSupplier(supplierData);
      }
      // Reset form fields
      setName('');
      setContact('');
      setEmail('');
      setAddress('');
      setShowForm(false); // Hide the form after submission
      refetch();
    } catch (error) {
      console.error('Failed to save supplier:', error);
    }
  };

  /**
   * Handle editing a supplier
   * @param {Object} supplier - Supplier object
   */
  const handleEditSupplier = (supplier) => {
    setName(supplier.name);
    setContact(supplier.contact);
    setEmail(supplier.email);
    setAddress(supplier.address);
    setEditSupplierId(supplier._id);
    setShowForm(true); // Show the form when editing
  };

  /**
   * Handle deleting a supplier
   * @param {String} id - Supplier ID
   */
  const handleDeleteSupplier = async (id) => {
    try {
      await deleteSupplier(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete supplier:', error);
    }
  };

  return (
    <div className='flex'>
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6"> {/* Adjust margin to account for fixed navigation bars */}
        <h2 className="text-2xl font-bold mb-4">Suppliers</h2>

        {/* Supplier Form */}
        <SupplierForm
          name={name}
          contact={contact}
          email={email}
          address={address}
          setName={setName}
          setContact={setContact}
          setEmail={setEmail}
          setAddress={setAddress}
          handleAddSupplier={handleAddSupplier}
          showForm={showForm}
          setShowForm={setShowForm}
          editSupplierId={editSupplierId}
        />

        {/* Supplier Table */}
        <SupplierTable
          suppliers={suppliers}
          handleEditSupplier={handleEditSupplier}
          handleDeleteSupplier={handleDeleteSupplier}
        />
      </div>
    </div>
  );
}

export default ManageSuppliers;
