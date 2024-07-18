// src/pages/ManageProducts.js
import React, { useState } from 'react';
import {
  useFetchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from '../services/productSlice';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';

function ManageProducts() {
  const { data: products = [], refetch } = useFetchProductsQuery(); // Fetch products from the backend
  const [addProduct] = useAddProductMutation(); // Mutation to add a product
  const [updateProduct] = useUpdateProductMutation(); // Mutation to update a product
  const [deleteProduct] = useDeleteProductMutation(); // Mutation to delete a product

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

  // Handle adding or updating a product
  const handleAddProduct = async () => {
    const productData = { name, description, price, category, stock };
    try {
      if (editProductId) {
        await updateProduct({ id: editProductId, data: productData });
        setEditProductId(null);
      } else {
        await addProduct(productData);
      }
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setShowForm(false); // Hide the form after submission
      refetch();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setEditProductId(product._id);
    setShowForm(true); // Show the form when editing
  };

  // Handle deleting a product
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
      <div className="flex-grow ml-64 mt-20 p-6"> {/* Adjust margin to account for fixed navigation bars */}
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        {/* Product Form */}
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

        {/* Product Table */}
        <ProductTable
          products={products}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
}

export default ManageProducts;
