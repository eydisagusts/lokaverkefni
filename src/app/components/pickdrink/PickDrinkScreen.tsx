"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../OrderContext";

type Drink = {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  category: string;
  ingredients: string[];
  price: number;
};

const PickDrinkScreen = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const { drinkOrderList, addDrinkToOrder, removeDrinkFromOrder } = useOrder();

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
    const drinkSum = drinkOrderList.reduce((sum, item) => sum + item.quantity, 0);

    if (drinkSum >= 10) {
      alert("You can only order up to 10 drinks!");
      return;
    }

    addDrinkToOrder(drink);
  };

  const handleRemoveFromOrder = (drink: Drink) => {
    removeDrinkFromOrder(drink.id);
  };

  const handlePlusIcon = (drink: Drink) => {
    const drinkSum = drinkOrderList.reduce((sum, item) => sum + item.quantity, 0);

    if (drinkSum >= 10) {
      alert("You can only order up to 10 drinks!");
      return;
    }

    addDrinkToOrder(drink);
  };

  const handleGoBack = () => {
    window.location.href = './pickdish';
  }

  const handleNextButton = () => {
    if (drinkOrderList.length === 0) {
      alert("Please select at least one drink before proceeding.");
      return;
    }
    window.location.href = "./orderscreen";
  }

  const drinkSum = drinkOrderList.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row w-full p-4">
      <div className="flex-1">
        <div className="absolute left-2">
          <button
          type="button"
          onClick={handleGoBack}
          className="p-2 underline text-black hover:text-gray-500"
          >
            Go Back
          </button>
        </div>
        <div className="text-center mt-2 font-bold">
          <h1 className="text-black text-4xl mt-8">Please select your drinks</h1>
          <p className="text-black">You can order up to 10 drinks!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full lg:w-4/5 mx-auto">
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
                  className="w-full h-50 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-xl text-black font-bold">{drink.name}</h4>
                    <p className="text-gray-600">{drink.category}</p>
                    <p className="text-sm text-black mt-2">{drink.ingredients.join(", ")}</p>
                  </div>
                  <p className="text-green-900 text-sm mt-2">${drink.price}</p>
                </div>
                {drinkOrderList.some((item) => item.drink?.id === drink.id) && (
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

      <div className="w-full lg:w-1/3 mt-16 lg:mt-36 lg:mr-10 lg:ml-8 ">
        <div className="border-2 border-black rounded-md p-4 flex flex-col justify-center">
          <h2 className="text-xl text-black font-bold mb-4 text-center">Your Order</h2>
          {drinkOrderList.length > 0 ? (
            <ul>
              {drinkOrderList.map((item) => (
                <li key={item.drink?.id} className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-black font-bold">{item.drink?.name}</p>
                    <p className="text-gray-600">x{item.quantity}
                      <button 
                        type="button"
                        className="text-green-500 ml-2"
                        onClick={() => item.drink && handlePlusIcon(item.drink)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </p>
                  </div>
                  <div className="text-right">
                    {item.drink && (
                      <p className="text-green-900">${item.drink.price * item.quantity}</p>
                    )}
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => item.drink && handleRemoveFromOrder(item.drink)}
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
        <div className="mt-4 flex justify-center lg:justify-end">
          <button 
            type="button"
            onClick={handleNextButton}
            className="px-8 py-2 rounded-full bg-[#C16757] text-white shadow-md hover:bg-[#A34A3F] transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickDrinkScreen;