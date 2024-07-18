import React, { useState } from 'react';
import { 
  useFetchPurchasesQuery, 
  useAddPurchaseMutation, 
  useUpdatePurchaseMutation, 
  useDeletePurchaseMutation } from '../services/purcheseSlice';
import { useFetchProductsQuery } from '../services/productSlice';
import { useGetSuppliersQuery } from '../services/supplierSlice';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import PurchaseForm from '../components/PurchaseForm';
import PurchaseTable from '../components/PurchaseTable';

function ManagePurchases() {
  const { data: purchases = [], refetch } = useFetchPurchasesQuery();
  const { data: products = [] } = useFetchProductsQuery();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const [addPurchase] = useAddPurchaseMutation();
  const [updatePurchase] = useUpdatePurchaseMutation();
  const [deletePurchase] = useDeletePurchaseMutation();

  const [product, setProduct] = useState('');
  const [supplier, setSupplier] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [editPurchaseId, setEditPurchaseId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddPurchase = async () => {
    const purchaseData = { product, supplier, quantity, price, totalPrice };
    if (editPurchaseId) {
      await updatePurchase({ id: editPurchaseId, data: purchaseData });
      setEditPurchaseId(null);
    } else {
      await addPurchase(purchaseData);
    }
    setProduct('');
    setSupplier('');
    setQuantity('');
    setPrice('');
    setTotalPrice(0);
    setShowForm(false);
    refetch();
  };

  const handleEditPurchase = (purchase) => {
    setProduct(purchase.product._id);
    setSupplier(purchase.supplier._id);
    setQuantity(purchase.quantity);
    setPrice(purchase.price);
    setTotalPrice(purchase.totalPrice);
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
    <div className='flex'>
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6">
        <h2 className="text-2xl font-bold mb-4">Purchases</h2>

        {!showForm && (
          <button
            className="bg-gray-900 text-white font-semibold p-2 rounded mb-4"
            onClick={() => setShowForm(true)}
          >
            ADD PURCHASE
          </button>
        )}

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
}

export default ManagePurchases;
