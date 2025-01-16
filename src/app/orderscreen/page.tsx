"use client";
import React, { useState } from "react";

const OrderScreen = () => {
  const [dishOrder, setDishOrder] = useState<Dish[]>([]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const handleConfirmOrder = () => {
    if (!name || !email || !phone || !date) {
      alert("Please fill in all fields");
    } else {
      window.location.href = "/receiptscreen";
    }
  };

  const HandleGoBack = () => {
    window.location.href = "/menu/pickdrink";
  };

  const total = dishOrder.reduce((acc, item) => acc + item.price, 0);

  const [emailError, setEmailError] = useState<string>("");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="absolute left-2 top-44">
          <button
            type="button"
            onClick={HandleGoBack}
            className="underline text-black hover:text-gray-500"
          >
            Go Back
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Restaurant Reservation
        </h2>
        <div className="grid grid-cols-1 gap-4 text-black">
          <label className="block">
            <span className="text-black">Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span className="text-black">Email</span>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                emailError ? "border-red-500" : "border-black"
              }`}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                const email = e.target.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  setEmailError("Please enter a valid email address.");
                } else {
                  setEmailError("");
                }
              }}
            />
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </label>
          <label className="block">
            <span className="text-black">Phone</span>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setPhone(e.target.value)}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/[^0-9]/g, "");
              }}
            />
          </label>
          <label className="block">
            <span className="text-black">Date</span>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>
          <label className="block">
            <span className="text-black">Time</span>
            <select
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setTime(Number(e.target.value))}
            >
              {Array.from({ length: 44 }, (_, i) => {
                const now = new Date();
                const hours = Math.floor(i / 4) + 11;
                const minutes = (i % 4) * 15;
                const timeString = `${hours
                  .toString()
                  .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                const selectedTime = new Date();
                selectedTime.setHours(hours, minutes, 0, 0);
                if (selectedTime > now) {
                  return (
                    <option key={timeString} value={i}>
                      {timeString}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </label>
          <label className="block">
            <span className="text-black">Quantity</span>
            <select
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setQuantity(Number(e.target.value))}
              defaultValue={2}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="mt-6 w-full bg-[#C16757] text-white py-2 rounded-lg shadow-md hover:bg-[#A34A3F] transition duration-300"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
