import React, { useState, useEffect } from 'react';
import { 
  useGetSalesQuery, 
  useCreateSaleMutation, 
  useUpdateSaleMutation, 
  useDeleteSaleMutation 
} from '../services/saleSlice';
import { useFetchProductsQuery } from '../services/productSlice';
import { useGetCustomersQuery } from '../services/customerSlice';
import SaleForm from '../components/SaleForm';
import SaleTable from '../components/SaleTable';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';

const ManageSales = () => {
  const { data: sales = [], refetch } = useGetSalesQuery();
  const [createSale] = useCreateSaleMutation();
  const [updateSale] = useUpdateSaleMutation();
  const [deleteSale] = useDeleteSaleMutation();

  const { data: products = [] } = useFetchProductsQuery();
  const { data: customers = [] } = useGetCustomersQuery();

  const [product, setProduct] = useState('');
  const [customer, setCustomer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editSaleId, setEditSaleId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editSaleId) {
      const saleToEdit = sales.find(sale => sale._id === editSaleId);
      if (saleToEdit) {
        setProduct(saleToEdit.product._id);
        setCustomer(saleToEdit.customer._id);
        setQuantity(saleToEdit.quantity);
        setPrice(saleToEdit.product.price);
        setTotalPrice(saleToEdit.totalPrice);
      }
    }
  }, [editSaleId, sales]);

  const handleAddSale = async () => {
    const saleData = { productName: product, customerName: customer, quantity, price, totalPrice };

    

    try {
      if (editSaleId) {
        await updateSale({ id: editSaleId, data: saleData });
        setEditSaleId(null);
      } else {
        await createSale(saleData);
      }
      setProduct('');
      setCustomer('');
      setQuantity('');
      setPrice(0);
      setTotalPrice(0);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Failed to save sale:', error);
    }
  };

  const handleEditSale = (sale) => {
    setEditSaleId(sale._id);
    setShowForm(true);
  };

  const handleDeleteSale = async (id) => {
    try {
      await deleteSale(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete sale:', error);
    }
  };

  return (
    <div className="flex">
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6">
        <h2 className="text-2xl font-bold mb-4">Sales</h2>
        <SaleForm
          product={product}
          customer={customer}
          quantity={quantity}
          price={price}
          totalPrice={totalPrice}
          setProduct={setProduct}
          setCustomer={setCustomer}
          setQuantity={setQuantity}
          setPrice={setPrice}
          setTotalPrice={setTotalPrice}
          handleAddSale={handleAddSale}
          showForm={showForm}
          setShowForm={setShowForm}
          editSaleId={editSaleId}
          products={products}
          customers={customers}
        />
        <SaleTable
          sales={sales}
          handleEditSale={handleEditSale}
          handleDeleteSale={handleDeleteSale}
        />
      </div>
    </div>
  );
};

export default ManageSales;
