'use client';
import React, { useState } from "react";
import { useOrder } from "../../../OrderContext";
import { useRouter } from "next/navigation";

const OrderScreen = () => {
  const { dishOrderList, drinkOrderList } = useOrder();
  const [reservationName, setReservationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservationDateTime, setReservationDateTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [emailError, setEmailError] = useState<string>("");
  const router = useRouter();

  const handleConfirmOrder = () => {
    if (!reservationName || !email || !phoneNumber || !reservationDateTime || !quantity) {
      alert("Please fill in all the reservation information.");
      return;
    }

    const dishesQuery = dishOrderList.map(item => `dishes[]=${item.dish?.id}`).join('&');
    const drinksQuery = drinkOrderList.map(item => `drinks[]=${item.drink?.id}`).join('&');
    const reservationQuery = `name=${encodeURIComponent(reservationName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phoneNumber)}&datetime=${encodeURIComponent(reservationDateTime)}&quantity=${quantity}`;

    router.push(`./receiptscreen?${dishesQuery}&${drinksQuery}&${reservationQuery}`);
  };

  const handleGoBack = () => {
    router.push('./pickdrink');
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="absolute left-2 top-4">
          <button
            type="button"
            onClick={handleGoBack}
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
              value={reservationName}
              onChange={(e) => setReservationName(e.target.value)}
            />
          </label>
          <label>
            <span className="text-black">Email</span>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                emailError ? "border-red-500" : "border-black"
              }`}
              value={email}
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={reservationDateTime.split("T")[0]}
              onChange={(e) => setReservationDateTime(`${e.target.value}T${reservationDateTime.split("T")[1]}`)}
              onBlur={(e) => {
                const selectedDate = new Date(e.target.value);
                const day = selectedDate.getUTCDay();
                if (day !== 0 && day !== 6) {
                  setReservationDateTime(`${e.target.value}T${reservationDateTime.split("T")[1]}`);
                } else {
                  alert("Bookings are only allowed from Monday to Friday.");
                  e.target.value = "";
                }
              }}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>
          <label className="block">
            <span className="text-black">Time</span>
            <select
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={reservationDateTime.split("T")[1]}
              onChange={(e) => setReservationDateTime(`${reservationDateTime.split("T")[0]}T${e.target.value}`)}
            >
              {Array.from({ length: 29 }, (_, i) => {
                const now = new Date();
                const hours = Math.floor(i / 4) + 16;
                const minutes = (i % 4) * 15;
                const timeString = `${hours
                  .toString()
                  .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                const selectedTime = new Date();
                selectedTime.setHours(hours, minutes, 0, 0);
                if (selectedTime > now) {
                  return (
                    <option key={timeString} value={timeString}>
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
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => {
                const value = i + 1;
                return (
                  <option key={`quantity-${value}`} value={value}>
                    {value}
                  </option>
                );
              })}
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