import React, { useEffect } from 'react';

const SaleForm = ({
  product,
  customer,
  quantity,
  price,
  totalPrice,
  setProduct,
  setCustomer,
  setQuantity,
  setPrice,
  setTotalPrice,
  handleAddSale,
  showForm,
  setShowForm,
  editSaleId,
  products,
  customers,
}) => {
  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  const handleProductChange = (e) => {
    const selectedProduct = products.find(p => p._id === e.target.value);
    setProduct(e.target.value);
    setPrice(selectedProduct ? selectedProduct.price : 0);
  };

  return (
    <>
      {!showForm && (
        <button
          className="bg-gray-900 text-white font-semibold p-2 rounded mb-4"
          onClick={() => setShowForm(true)}
        >
          ADD SALE
        </button>
      )}
      {showForm && (
        <div className="mb-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-2">
          <select
            className="border p-2 flex-1"
            value={product}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            {products.map((prod) => (
              <option key={prod._id} value={prod._id}>
                {prod.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2 flex-1"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map((cust) => (
              <option key={cust._id} value={cust._id}>
                {cust.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="border p-2 flex-1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 flex-1"
            placeholder="Price"
            value={price}
            readOnly
          />
          <input
            type="number"
            className="border p-2 flex-1"
            placeholder="Total Price"
            value={totalPrice}
            readOnly
          />
          <button
            className="bg-gray-900 text-white font-semibold p-2 rounded"
            onClick={handleAddSale}
          >
            {editSaleId ? 'UPDATE SALE' : 'ADD SALE'}
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded"
            onClick={() => setShowForm(false)}
          >
            CANCEL
          </button>
        </div>
      )}
    </>
  );
};

export default SaleForm;
