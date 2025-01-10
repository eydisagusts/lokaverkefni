"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

  const fetchDrinks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders");
      const data = await response.json();
      if (data.length > 0) {
        const allDrinks = data.flatMap((order: any) => order.drinks);
        setDrinks(allDrinks.slice(0, 9));
      }
    } catch (error) {
      console.error("Error fetching drinks", error);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="text-center mt-2 font-bold">
        <h1 className="text-black text-4xl mt-8">Please select your drinks</h1>
        <p>You can order up to 10 drinks!</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 w-2/5 ml-20">
        {drinks.length > 0 ? (
          drinks.map((drink) => (
            <div
              key={drink.id}
              className="border-2 border-black rounded-md overflow-hidden shadow-lg"
            >
              <Image
                src={drink.imageSource}
                alt={drink.name}
                width={300}
                height={300}
                className="w-50 h-50 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold">{drink.name}</h4>
                <p className="text-gray-600">{drink.category}</p>
                <p className="text-sm mt-2">{drink.ingredients}</p>
                <p className="text-green-900 text-sm">${drink.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-lg">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PickDrinkScreen;
