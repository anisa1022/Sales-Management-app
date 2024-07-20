import React, { useState, useEffect } from 'react';
import { 
  useFetchPurchasesQuery, 
  useCreatePurchaseMutation, 
  useUpdatePurchaseMutation, 
  useDeletePurchaseMutation 
} from '../services/purcheseSlice';
import { useFetchProductsQuery } from '../services/productSlice';
import { useGetSuppliersQuery } from '../services/supplierSlice';
import PurchaseForm from '../components/PurchaseForm';
import PurchaseTable from '../components/PurchaseTable';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';

const ManagePurchases = () => {
  const { data: purchases = [], refetch } = useFetchPurchasesQuery();
  const [createPurchase] = useCreatePurchaseMutation();
  const [updatePurchase] = useUpdatePurchaseMutation();
  const [deletePurchase] = useDeletePurchaseMutation();

  const { data: products = [] } = useFetchProductsQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();

  const [product, setProduct] = useState('');
  const [supplier, setSupplier] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editPurchaseId, setEditPurchaseId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editPurchaseId) {
      const purchaseToEdit = purchases.find(purchase => purchase._id === editPurchaseId);
      if (purchaseToEdit) {
        setProduct(purchaseToEdit.product._id);
        setSupplier(purchaseToEdit.supplier._id);
        setQuantity(purchaseToEdit.quantity);
        setPrice(purchaseToEdit.product.price);
        setTotalPrice(purchaseToEdit.totalPrice);
      }
    }
  }, [editPurchaseId, purchases]);

  const handleAddPurchase = async () => {
    const purchaseData = { productName: product, supplierName: supplier, quantity, price, totalPrice };

    try {
      if (editPurchaseId) {
        await updatePurchase({ id: editPurchaseId, data: purchaseData });
        setEditPurchaseId(null);
      } else {
        await createPurchase(purchaseData);
      }
      setProduct('');
      setSupplier('');
      setQuantity('');
      setPrice(0);
      setTotalPrice(0);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Failed to save purchase:', error);
    }
  };

  const handleEditPurchase = (purchase) => {
    setEditPurchaseId(purchase._id);
    setShowForm(true);
  };

  const handleDeletePurchase = async (id) => {
    try {
      await deletePurchase(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete purchase:', error);
    }
  };

  return (
    <div className="flex">
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6">
        <h2 className="text-2xl font-bold mb-4">Purchases</h2>
        <PurchaseForm
          product={product}
          supplier={supplier}
          quantity={quantity}
          price={price}
          totalPrice={totalPrice}
          setProduct={setProduct}
          setSupplier={setSupplier}
          setQuantity={setQuantity}
          setPrice={setPrice}
          setTotalPrice={setTotalPrice}
          handleAddPurchase={handleAddPurchase}
          showForm={showForm}
          setShowForm={setShowForm}
          editPurchaseId={editPurchaseId}
          products={products}
          suppliers={suppliers}
        />
        <PurchaseTable
          purchases={purchases}
          handleEditPurchase={handleEditPurchase}
          handleDeletePurchase={handleDeletePurchase}
        />
      </div>
    </div>
  );
};

export default ManagePurchases;
