import React, { useState, useEffect } from 'react';
import {
  useFetchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from '../services/productSlice';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';

const ManageProducts = () => {
  const { data: products = [], refetch } = useFetchProductsQuery();
  const [createProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = async () => {
    const productData = { name, description, price, category, stock: Number(stock) };
    try {
      if (editProductId) {
        await updateProduct({ id: editProductId, data: productData });
        setEditProductId(null);
      } else {
        await createProduct(productData);
      }
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setEditProductId(product._id);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      refetch();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className='flex'>
      <Header />
      <NavigationBar />
      <div className="flex-grow ml-64 mt-20 p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        <ProductForm
          name={name}
          description={description}
          price={price}
          category={category}
          stock={stock}
          setName={setName}
          setDescription={setDescription}
          setPrice={setPrice}
          setCategory={setCategory}
          setStock={setStock}
          handleAddProduct={handleAddProduct}
          showForm={showForm}
          setShowForm={setShowForm}
          editProductId={editProductId}
        />

        <ProductTable
          products={products}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ManageProducts;
