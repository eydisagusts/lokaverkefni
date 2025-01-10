"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

const carouselImages = [
  "/images/meal1.jpg",
  "/images/meal2.jpg",
  "/images/meal3.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <div className="relative w-full max-w-4xl overflow-hidden mt-10">
      <div className="relative w-[700px] h-[350px] justify-start items-center mx-auto border border-black">
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#10094;
        </button>
        <Image
          src={carouselImages[currentIndex]}
          alt={`meal${currentIndex + 1}`}
          width={700}
          height={450}
          className="object-cover w-full h-full"
        />
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <div className="relative">
        <Carousel />
        <div className="absolute top-0 right-0 mt-20 mr-96 text-center w-2/6 ">
          <div>
            <h1 className="font-bold mb-2 text-3xl">Welcome to Lil'bits!</h1>
            <p>
              At Lil'bits, we believe the best moments are shared over delicious
              food and great drinks. Located in the heart of Reykjavík, our cozy
              spot offers a little bit of everything—from hearty meals to
              shareable bites, refreshing cocktails, and everything in between.
              Our menu is inspired by comfort classics with a modern twist, made
              fresh from locally sourced ingredients. Whether you’re stopping by
              for a casual lunch, a lively happy hour, or an intimate dinner,
              Lil'bits is here to make every visit special. Come for the food,
              stay for the vibe—because life’s best moments come in little bits.
            </p>
          </div>
        </div>
        <div className="w-2/6 ml-28 mt-10">
          <h1 className="text-3xl font-bold mb-6 ml-20">
            How to Reserve a Table at Lil'bits
          </h1>
          <ol className="space-y-4 list-decimal ml-20">
            <li className="font-bold">
              Order Dishes –
              <span className="font-normal">
                {" "}
                Select up to 10 dishes from our menu.
              </span>
            </li>
            <li className="font-bold">
              Add Drinks –
              <span className="font-normal">
                {" "}
                Choose up to 10 drinks to pair with your meal.
              </span>
            </li>
            <li className="font-bold">
              Book Your Table –
              <span className="font-normal">
                {" "}
                Pick a date, time, and number of guests.
              </span>
            </li>
            <li className="font-bold">
              Confirm & Enjoy –
              <span className="font-normal">
                {" "}
                Get your receipt and get ready for an amazing dining experience!
              </span>
            </li>
          </ol>
          <p className="mt-6 ml-16">
            Planning your perfect dining experience has never been simpler.
            Start your reservation today and get ready to enjoy the
            unforgettable flavors of Lil'bits!
          </p>
        </div>
      </div>
      <div className="absolute bottom-10 right-14 w-1/4 mr-96">
        <div className="text-center justify-center border-2 border-black h-72 mt-2">
          <p className="text-black mt-2 text-lg">Find your order</p>

          <div className="mt-8">
            <p className="text-black mb-2">Please enter your email</p>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-sm mt-1 text-black border-black"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
