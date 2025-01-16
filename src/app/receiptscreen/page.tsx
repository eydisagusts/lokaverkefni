"use client";
import type React from "react";
import { useSearchParams } from "next/navigation";

const ReceiptScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const datetime = searchParams.get("datetime");
  const quantity = searchParams.get("quantity");
  const dishes = searchParams.getAll("dishes");
  const drinks = searchParams.getAll("drinks");

  const receiptData = {
    storeName: "Lil'Bits",
    date: new Date().toLocaleDateString(),
    items: [
      ...dishes.map((id) => ({ name: `Dish ${id}`, quantity: 1, price: 10.0 })), // Replace with actual dish data
      ...drinks.map((id) => ({ name: `Drink ${id}`, quantity: 1, price: 5.0 })), // Replace with actual drink data
    ],
    total: dishes.length * 10.0 + drinks.length * 5.0, // Replace with actual total calculation
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
        <div className="flex flex-col items-center receipt-date text-center text-gray-600 mb-4">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Date and Time:</strong> {datetime} </p>
        </div>
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