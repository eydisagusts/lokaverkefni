"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Dish = {
  id: string;
  name: string;
  description: string;
  imageSource: string;
  category: string;
};

const PickDishScreen = () => {
  const [dish, setDish] = useState<Dish | null>(null);

  const fetchRandomDish = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders");
      const data = await response.json();
      if (data.length > 0) {
        const randomDish = data[Math.floor(Math.random() * data.length)].dish;
        setDish(randomDish);
      }
    } catch (error) {
      console.error("Error fetching random dish", error);
    }
  };

  useEffect(() => {
    fetchRandomDish();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col text-center mt-2 font-bold">
        <h1 className="text-black text-4xl mt-8">This dish is selected</h1>
        <p>
          You can add the selected dish to your order or Generate a new dish
        </p>
      </div>

      <div className="flex justify-center items-center border-2 border-black w-2/5 h-80 mt-4 mx-auto">
        {dish ? (
          <Image
            src={dish.imageSource}
            alt={dish.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="border-2 border-black text-black flex flex-col w-2/5 mt-1 mx-auto">
        {dish ? (
          <>
            <h4 className="text-2xl font-bold ml-2 mt-2">{dish.name}</h4>
            <p className="font-bold text-lg ml-2 mt-2">{dish.category}</p>
          </>
        ) : (
          <p>Loading dish details...</p>
        )}
      </div>

      <div className="flex flex-row items-center text-center justify-center gap-10 text-gray-200 font-semibold mb-6">
        <button
          type="button"
          className=" p-4 mt-4 rounded-full bg-[#C16757] shadow-md"
          onClick={fetchRandomDish}
        >
          Generate New Dish
        </button>
        <button
          type="button"
          className=" p-4 mt-4 rounded-full ml-4 bg-[#C16757] shadow-md"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default PickDishScreen;
