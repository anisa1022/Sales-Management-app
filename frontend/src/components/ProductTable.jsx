// src/components/ProductTable.js
import React from 'react';

const ProductTable = ({ products, handleEditProduct, handleDeleteProduct }) => (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse mt-10">
      <thead>
        <tr className="bg-gray-900 text-white font-semibold">
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Description</th>
          <th className="px-4 py-2 border">Price</th>
          <th className="px-4 py-2 border">Category</th>
          <th className="px-4 py-2 border">Stock</th>
          <th className="px-4 py-2 border">Update</th>
          <th className="px-4 py-2 border">Remove</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="border-t">
            <td className="px-4 py-2 border">{product.name}</td>
            <td className="px-4 py-2 border">{product.description}</td>
            <td className="px-4 py-2 border">{product.price}</td>
            <td className="px-4 py-2 border">{product.category}</td>
            <td className="px-4 py-2 border">{product.stock}</td>
            <td className="px-4 py-2 border">
              <button
                className="bg-[#4A6FA5] text-white p-2 rounded"
                onClick={() => handleEditProduct(product)}
              >
                EDIT
              </button>
            </td>
            <td className="px-4 py-2 border">
              <button
                className="bg-[#A54A4A] text-white p-2 rounded"
                onClick={() => handleDeleteProduct(product._id)}
              >
                DELETE
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
