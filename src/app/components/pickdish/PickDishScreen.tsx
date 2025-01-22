"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useOrder } from "../../OrderContext";

type Dish = {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  ingredients: string[];
  category: string;
  price: number;
};

type OrderItem = {
  dish: Dish;
  quantity: number;
};

const PickDishScreen = () => {
  const [dish, setDish] = useState<Dish | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const maxOrderLimit = 10;
  const { dishOrderList, addDishToOrder, removeDishFromOrder } = useOrder();

  const fetchDishes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders");
      const data = await response.json();
      console.log("Fetched data:", data);
      if (data.length > 0) {
        const allDishes = data.flatMap((order: { dish: Dish[] }) => order.dish);
        const shuffledDishes = shuffleArray(allDishes);
        setDishes(shuffledDishes);
        setDish(shuffledDishes[0]);
      }
    } catch (error) {
      console.error("Error fetching dishes", error);
    }
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const shuffleArray = (array: Dish[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchRandomDish = () => {
    if (dishes.length === 0) return;
    const nextDishIndex = (currentDishIndex + 1) % dishes.length;
    setDish(dishes[nextDishIndex]);
    setCurrentDishIndex(nextDishIndex);
  };

  const handleAddToOrder = () => {
    if (!dish) return;
  
    const totalQuantity = dishOrderList.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity >= maxOrderLimit) {
      alert("You can only order up to 10 dishes!");
      return;
    }

    addDishToOrder(dish);
  };

  const handleRemoveFromOrder = (dishId: string) => {
    removeDishFromOrder(dishId);
  };

  const handleGoBack = () => {
    window.location.href = '/';
  };

  const handleNextButtonClick = () => {
    window.location.href = "./pickdrink";
  }

  const totalQuantity = dishOrderList.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row w-full p-4">
      <div className="flex-1 text-center">
        <div className="absolute left-2">
          <button
            type="button"
            className="p-2 underline text-black hover:text-gray-500"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
        <h1 className="text-black text-4xl mt-8">Your Dish Selection</h1>
        <p className="text-black mt-2">You can order up to 10 dishes!</p>

        <div className="mt-8">
          {dish ? (
            <div className="border-2 border-black rounded-md p-4 mx-auto w-full md:w-1/2">
              <Image
                src={dish.imageSource}
                alt={dish.name}
                width={300}
                height={300}
                className="w-full h-auto object-cover"
              />
              <h2 className="text-black text-2xl font-bold mt-4">{dish.name}</h2>
              <p className="text-black mt-2">{dish.ingredients.join(", ")}</p>
              <p className="text-green-900 font-bold mt-2">${dish.price}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            className="p-4 rounded-full bg-[#C16757] text-white shadow-md hover:bg-[#A34A3F] transition duration-300"
            onClick={fetchRandomDish}
          >
            Generate New Dish
          </button>
          <button
            type="button"
            className="p-4 rounded-full bg-[#C16757] text-white shadow-md hover:bg-[#A34A3F] transition duration-300"
            onClick={handleAddToOrder}
          >
            Add to Order
          </button>
        </div>
      </div>

      <div className="w-2/3 lg:w-1/3 mt-16 ml-36 lg:mt-28 lg:mr-20 lg:ml-8">
        <div className="border-2 border-black rounded-md p-4 flex flex-col justify-center">
          <h2 className="text-xl text-black font-bold mb-4 text-center">Your Order</h2>
          {dishOrderList.length > 0 ? (
            <ul>
              {dishOrderList.map((item) => (
                <li key={item.dish?.id} className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-black font-bold">{item.dish?.name}</p>
                    <p className="text-gray-600">
                      x{item.quantity}
                      <button
                        type="button"
                        className="text-green-500 ml-2"
                        onClick={() => item.dish && addDishToOrder(item.dish)}
                      >
                        +
                      </button>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-900">${item.dish ? item.dish.price * item.quantity : 0}</p>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => item.dish && handleRemoveFromOrder(item.dish.id)}
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
            <p className="text-black">Total dishes: {totalQuantity}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center lg:justify-end">
          <button 
            type="button"
            onClick={handleNextButtonClick}
            className="px-8 py-2 rounded-full bg-[#C16757] text-white shadow-md hover:bg-[#A34A3F] transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickDishScreen;