
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
  editProductId,
  setEditProductId
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
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
          <button
            className="bg-gray-900 text-white font-semibold p-2 rounded w-full md:w-auto"
            onClick={handleAddProduct}
          >
            {editProductId ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded w-full md:w-auto"
            onClick={() => {
              setShowForm(false);
              setEditProductId(null);
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    )}
  </>
);

export default ProductForm;
