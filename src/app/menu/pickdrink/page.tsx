"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

type Drink = {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  category: string;
  ingredients: string[];
  price: number;
};

type OrderItem = {
  drink: Drink;
  quantity: number;
};

const PickDrinkScreen = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [orderList, setOrderList] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders");
        const data = await response.json();
        if (data.length > 0) {
          const allDrinks = data.flatMap((order: { drinks: Drink[] }) => order.drinks);
          setDrinks(allDrinks.slice(0, 9));
        }
      } catch (error) {
        console.error("Error fetching drinks", error);
      }
    };

    fetchDrinks();
  }, []);

  const handleAddToOrder = (drink: Drink) => {
    setOrderList((prevOrderList) => {
      const drinkSum = prevOrderList.reduce((sum, item) => sum + item.quantity, 0);

      if (drinkSum >= 10) {
        alert("You can only order up to 10 drinks!");
        return prevOrderList;
      }

      const existingItem = prevOrderList.find((item) => item.drink.id === drink.id);

      if (existingItem) {
        return prevOrderList.map((item) =>
          item.drink.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevOrderList, { drink, quantity: 1 }];
    });
  };

  const handleRemoveFromOrder = (drink: Drink) => {
    setOrderList((prevOrderList) =>
      prevOrderList
        .map((item) =>
          item.drink.id === drink.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handlePlusIcon = (drink: Drink) => {
    setOrderList((prevOrderList) => {
      const drinkSum = prevOrderList.reduce((sum, item) => sum + item.quantity, 0);

      if (drinkSum >= 10) {
        alert("You can only order up to 10 drinks!");
        return prevOrderList;
      }

      const existingItem = prevOrderList.find((item) => item.drink.id === drink.id);

      if (existingItem) {
        return prevOrderList.map((item) =>
          item.drink.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevOrderList, { drink, quantity: 1 }];
    });
  };

  const handleGoBack = () => {
    window.location.href = '/menu/pickdish';
  }

  const handleNextButton = () => {
    if (orderList.length === 0) {
      alert("Please select at least one drink before proceeding.");
      return;
    }
    window.location.href = "../orderscreen";
  }

  const drinkSum = orderList.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex w-full p-4">
      <div className="flex-1">
        <div className="absolute left-2">
          <button
          type="button"
          onClick={handleGoBack}
          className="p-2 rounded-full underline text-black hover:text-gray-500"
          >
            Go Back
          </button>
        </div>
        <div className="text-center mt-2 font-bold">
          <h1 className="text-black text-4xl mt-8">Please select your drinks</h1>
          <p className="text-black">You can order up to 10 drinks!</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 w-4/5 ml-20">
          {drinks.length > 0 ? (
            drinks.map((drink) => (
              <div
                key={drink.id}
                className="relative border-2 border-black cursor-pointer rounded-md overflow-hidden shadow-lg hover:bg-gray-300 flex flex-col justify-between"
                onClick={() => handleAddToOrder(drink)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAddToOrder(drink);
                  }
                }}
              >
                <Image
                  src={drink.imageSource}
                  alt={drink.name}
                  width={300}
                  height={300}
                  className="w-50 h-50 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-xl text-black font-bold">{drink.name}</h4>
                    <p className="text-gray-600">{drink.category}</p>
                    <p className="text-sm text-black mt-2">{drink.ingredients.join(", ")}</p>
                  </div>
                  <p className="text-green-900 text-sm mt-2">${drink.price}</p>
                </div>
                {orderList.some((item) => item.drink.id === drink.id) && (
                  <div className="absolute top-2 right-2 text-green-500">
                    <FontAwesomeIcon icon={faCheck} size="2x" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-lg">Loading...</p>
          )}
        </div>
      </div>

      <div className="w-1/3 mt-32 mr-36">
        <div className="border-2 border-black rounded-md p-4 flex flex-col justify-center">
          <h2 className="text-xl text-black font-bold mb-4 text-center">Your Order</h2>
          {orderList.length > 0 ? (
            <ul>
              {orderList.map((item) => (
                <li key={item.drink.id} className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-black font-bold">{item.drink.name}</p>
                    <p className="text-gray-600">x{item.quantity}
                      <button 
                        type="button"
                        className="text-green-500 ml-2"
                        onClick={() => handlePlusIcon(item.drink)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-900">${item.drink.price * item.quantity}</p>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => handleRemoveFromOrder(item.drink)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No items in your order</p>
          )}
          <div>
            <p className="text-black">You have ordered this many drinks: {drinkSum}</p>
          </div>
        </div>
        <div>
          <button 
            type="button"
            onClick={handleNextButton}
            className="p-2 px-10 text-lg mt-4 rounded-full bg-[#C16757] shadow-md ml-96 hover:bg-[#A34A3F] text-white transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickDrinkScreen;