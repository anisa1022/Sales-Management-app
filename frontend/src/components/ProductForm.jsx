// src/components/ProductForm.js
import React from 'react';

const ProductForm = ({
  name,
  description,
  price,
  category,
  stock,
  setName,
  setDescription,
  setPrice,
  setCategory,
  setStock,
  handleAddProduct,
  showForm,
  setShowForm,
  editProductId
}) => (
  <>
    {!showForm && (
      <button
        className="bg-gray-900 text-white font-semibold p-2 rounded mb-4"
        onClick={() => setShowForm(true)}
      >
        ADD PRODUCT
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
          type="text"
          className="border p-2 flex-1"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 flex-1"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 flex-1"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button
          className="bg-gray-900 text-white font-semibold p-2 rounded"
          onClick={handleAddProduct}
        >
          {editProductId ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => {
            setShowForm(false);
            setEditProductId(null);
          }}
        >
          CANCEL
        </button>
      </div>
    )}
  </>
);

export default ProductForm;
