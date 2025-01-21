"use client";
import type React from "react";
import { useSearchParams } from "next/navigation";
import { useOrder } from "../../../OrderContext";

const ReceiptScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const datetime = searchParams.get("datetime");
  const { dishOrderList, drinkOrderList, clearOrder } = useOrder();

  const receiptData = {
    storeName: "Lil'Bits",
    date: new Date().toLocaleDateString(),
    items: [
      ...dishOrderList.map((item) => ({
        name: item.dish?.name,
        quantity: item.quantity,
        price: item.dish?.price,
      })),
      ...drinkOrderList.map((item) => ({
        name: item.drink?.name,
        quantity: item.quantity,
        price: item.drink?.price,
      })),
    ],
    total: dishOrderList.reduce((acc, item) => acc + (item.dish?.price || 0) * item.quantity, 0) +
           drinkOrderList.reduce((acc, item) => acc + (item.drink?.price || 0) * item.quantity, 0),
  };

  const handleGoHome = () => {
    clearOrder();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center mt-20 text-black p-4">
      <div className="absolute left-2 top-44">
        <button
          type="button"
          onClick={handleGoHome}
          className="p-2 underline text-black hover:text-gray-500"
        >
          Home
        </button>
      </div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">Thank you for your order</h1>
        <p>We can't wait to see you!</p>
      </div>
      <div className="receipt-container bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-full max-w-2xl mt-6">
        <h1 className="store-name text-center text-2xl font-bold mb-4">
          {receiptData.storeName}
        </h1>
        <div className="flex flex-col items-center receipt-date text-center text-gray-600 mb-4">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Date and Time:</strong> {datetime}</p>
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
            {receiptData.items.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">${item.price?.toFixed(2)}</td>
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