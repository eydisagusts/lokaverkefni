"use client";
import type React from "react";

const ReceiptScreen: React.FC = () => {
  const receiptData = {
    storeName: "Lil'Bits",
    date: "2023-10-01",
    items: [
      { name: "Item 1", quantity: 2, price: 10.0 },
      { name: "Item 2", quantity: 1, price: 20.0 },
      { name: "Item 3", quantity: 3, price: 5.0 },
    ],
    total: 55.0,
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center mt-20 text-black">
      <div className="absolute left-2 top-44">
        <button
          type="button"
          onClick={handleGoHome}
          className="p-2 underline text-black hover:text-gray-500"
        >
          Home
        </button>
      </div>
      <div className="absolute top-44 text-center">
      <h1 className="text-2xl font-bold">Thank you for your order</h1>
      <p className="">We can't wait to see you!</p>
      </div>
      <div className="receipt-container bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-3/4 mt-6">
        <h1 className="store-name text-center text-2xl font-bold mb-4">
          {receiptData.storeName}
        </h1>
        <p className="receipt-date text-center text-gray-600 mb-4">
          Date: {receiptData.date}
        </p>
        <table className="receipt-table w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {receiptData.items.map((item) => (
              <tr key={item.name} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="receipt-total text-right text-xl font-bold">
          Total: ${receiptData.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ReceiptScreen;
