'use client';
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Dish = {
  id: number;
  name: string;
  price: number;
};

type Drink = {
  id: number;
  name: string;
  price: number;
};

const OrderScreen = () => {
  const [dishOrder, setDishOrder] = useState<Dish[]>([]);
  const [drinkOrder, setDrinkOrder] = useState<Drink[]>([]);
  const [reservationName, setReservationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservationDateTime, setReservationDateTime] = useState("");
  const [quantity, setQuantity] = useState(2); // Default value set to 2
  const [emailError, setEmailError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = {
      dishes: searchParams.getAll('dishes'),
      drinks: searchParams.getAll('drinks')
    };

    const fetchDishes = async () => {
      const dishIds = Array.isArray(query.dishes) ? query.dishes : [query.dishes];
      const dishes: Dish[] = await Promise.all(dishIds.map(async (id: string): Promise<Dish> => {
        const response = await fetch(`http://localhost:3001/api/dishes/${id}`);
        return response.json();
      }));
      setDishOrder(dishes);
    };

    const fetchDrinks = async () => {
      const drinkIds = Array.isArray(query.drinks) ? query.drinks : [query.drinks];
      const drinks: Drink[] = await Promise.all(drinkIds.map(async (id: string): Promise<Drink> => {
        const response = await fetch(`http://localhost:3001/api/drinks/${id}`);
        return response.json();
      }));
      setDrinkOrder(drinks);
    };

    fetchDishes();
    fetchDrinks();
  }, [searchParams]);

  const handleConfirmOrder = () => {
    if (!reservationName || !email || !phoneNumber || !reservationDateTime || !quantity) {
      alert("Please fill in all the reservation information.");
      return;
    }

    const dishesQuery = dishOrder.map(item => `dishes[]=${item.id}`).join('&');
    const drinksQuery = drinkOrder.map(item => `drinks[]=${item.id}`).join('&');
    const reservationQuery = `name=${encodeURIComponent(reservationName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phoneNumber)}&datetime=${encodeURIComponent(reservationDateTime)}&quantity=${quantity}`;

    window.location.href = `/receiptscreen?${dishesQuery}&${drinksQuery}&${reservationQuery}`;
  };

  const handleGoBack = () => {
    window.location.href = '/menu/pickdrink';
  };

  const total = [...dishOrder, ...drinkOrder].reduce((acc, item) => acc + item.price, 0);

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
              onChange={(e) => setReservationDateTime(e.target.value + "T" + reservationDateTime.split("T")[1])}
              onBlur={(e) => {
                const selectedDate = new Date(e.target.value);
                const day = selectedDate.getUTCDay();
                if (day !== 0 && day !== 6) {
                  setReservationDateTime(e.target.value + "T" + reservationDateTime.split("T")[1]);
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
              onChange={(e) => setReservationDateTime(reservationDateTime.split("T")[0] + "T" + e.target.value)}
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