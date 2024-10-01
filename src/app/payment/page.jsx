'use client';
import { useState } from 'react';

export default function Payment() {
  const [amount, setAmount] = useState('');
  const [productId, setProductId] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/esewa-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount),  
        product_id: productId, 
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Payment initiation failed.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handlePayment}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-green-600">
          eSewa Payment
        </h1>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-gray-700 font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="productId" className="text-gray-700 font-medium mb-2">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter product ID"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Pay with eSewa
          </button>
        </div>
      </form>
    </div>
  );
}
