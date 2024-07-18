import React, { useState } from 'react';
import { 
  useGetCustomersQuery, 
  useCreateCustomerMutation, 
  useUpdateCustomerMutation, 
  useDeleteCustomerMutation 
} from '../services/customerSlice';
import CustomerForm from '../components/CustomerForm';
import CustomerTable from '../components/CustomerTable';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';

const ManageCustomers = () => {
  const { data: customers = [], refetch } = useGetCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ state: '', city: '', district: '' });
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddCustomer = async () => {
    const customerData = { name, email, phone, address };

    try {
      if (editCustomerId) {
        await updateCustomer({ id: editCustomerId, ...customerData });
        setEditCustomerId(null);
      } else {
        await createCustomer(customerData);
      }
      setName('');
      setEmail('');
      setPhone('');
      setAddress({ state: '', city: '', district: '' });
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Failed to save customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
    setEditCustomerId(customer._id);
    setShowForm(true);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  return (
    <div className="flex">
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6">
        <h2 className="text-2xl font-bold mb-4">Customers</h2>
        <CustomerForm
          name={name}
          email={email}
          phone={phone}
          address={address}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setAddress={setAddress}
          handleAddCustomer={handleAddCustomer}
          showForm={showForm}
          setShowForm={setShowForm}
          editCustomerId={editCustomerId}
        />
        <CustomerTable
          customers={customers}
          handleEditCustomer={handleEditCustomer}
          handleDeleteCustomer={handleDeleteCustomer}
        />
      </div>
    </div>
  );
};

export default ManageCustomers;
