"use client";
import type React from "react";
import { useState } from "react";
import { useOrder } from "../../OrderContext";
import { useRouter } from "next/navigation";

const OrderScreen = () => {
  const { dishOrderList, drinkOrderList } = useOrder();
  const [reservationName, setReservationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const router = useRouter();
  
  const handleConfirmOrder = () => {
    if (!reservationName || !email || !phoneNumber || !reservationDate) {
      alert("Please fill in all the reservation information.");
      return;
    }

    const reservationDateTime = `${reservationDate}T${reservationTime}`;
    const dishesQuery = dishOrderList
      .map((item) => `dishes[]=${item.dish?.id}`)
      .join("&");
    const drinksQuery = drinkOrderList
      .map((item) => `drinks[]=${item.drink?.id}`)
      .join("&");
    const reservationQuery = `name=${encodeURIComponent(
      reservationName
    )}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(
      phoneNumber
    )}&datetime=${encodeURIComponent(
      reservationDateTime
    )}&quantity=${quantity}`;

    router.push(
      `./receiptscreen?${dishesQuery}&${drinksQuery}&${reservationQuery}`
    );
  };

  const handleGoBack = () => {
    router.push("./pickdrink");
  };

  const getAvailableTimes = () => {
    const now = new Date();
    const selectedDate = new Date(reservationDate);
    const isToday = selectedDate.toDateString() === now.toDateString();
    const times = [];

    for (let i = 0; i < 29; i++) {
      const hours = Math.floor(i / 4) + 16;
      const minutes = (i % 4) * 15;
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      const time = new Date(selectedDate);
      time.setHours(hours, minutes, 0, 0);

      if (!isToday || time > now) {
        times.push(timeString);
      }
    }

    return times;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getUTCDay();
    if (day === 0 || day === 6) {
      alert("Bookings are only allowed from Monday to Friday.");
      setReservationDate("");
    } else {
      setReservationDate(e.target.value);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedPhoneNumber = input
      .replace(/(\d{3})(\d{4})/, "$1-$2")
      .substring(0, 8);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handlePhoneNumberBlur = () => {
    if (phoneNumber.length !== 8) {
      setPhoneError("Please enter a valid phone number.");
    } else {
      setPhoneError("");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const nameRegex = /^[\p{L} ]+$/u; // Unicode property escape for letters
    if (!nameRegex.test(name)) {
      setNameError("Please enter a valid name.");
    } else {
      setNameError("");
    }
    setReservationName(name);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="absolute left-2 top-44">
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
              className={`mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
                nameError ? "border-red-500" : "border-black"
              }`}
              value={reservationName}
              onChange={handleNameChange}
            />
            {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
          </label>
          <label>
            <span className="text-black">Email</span>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
                emailError ? "border-red-500" : "border-black"
              }`}
              value={email}
              placeholder="example@domain.is"
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
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 ${
                phoneError ? "border-red-500" : "border-black"
              }`}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onBlur={handlePhoneNumberBlur}
              placeholder="(354) 888-1234"
            />
            {phoneError && <p className="text-red-500 mt-1">{phoneError}</p>}
          </label>
          <label className="block">
            <span className="text-black">Date</span>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              value={reservationDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>
          <label className="block">
            <span className="text-black">Time</span>
            <select
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
            >
              {getAvailableTimes().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-black">Quantity</span>
            <select
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
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