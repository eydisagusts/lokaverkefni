"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface CarouselProps {
  carouselImages: string[];
}

const Carousel: React.FC<CarouselProps> = ({ carouselImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <div className="relative w-full max-w-4xl overflow-hidden mt-10 px-4 sm:px-8 mx-auto">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] mx-auto border border-black">
        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#10094;
        </button>
        {carouselImages[currentIndex] && (
          <Image
            src={carouselImages[currentIndex]}
            alt={`meal${currentIndex + 1}`}
            className="object-cover w-full h-full"
            priority
            width={500}
            height={500}
          />
        )}
        <button
          type="button"
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
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailFromSlug = searchParams.get("email");
    if (emailFromSlug) {
      router.push(`/pick-dish?email=${emailFromSlug}`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders");
        const data = await response.json();
        if (data.length > 0 && data[0].dish) {
          setCarouselImages(
            data[0].dish
              .slice(0, 3)
              .map((dish: { imageSource: string }) => dish.imageSource)
          );
        } else {
          console.error("No dishes found in the response data");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleNewOrder = () => {
    router.push("/pickdish");
  };

  return (
    <>
      <div className="relative text-black space-y-8 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row lg:space-x-8 items-center">
          <div className="w-full lg:w-1/2 mt-10 lg:-mt-[250px]">
            <Carousel carouselImages={carouselImages} />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col justify-center items-center text-center mt-10 lg:mt-0">
            <h1 className="font-bold mb-2 text-2xl lg:mt-44">
              Welcome to Lil&apos;bits!
            </h1>
            <p className="text-center px-4 sm:px-8 md:px-16 lg:px-0">
              At Lil&apos;bits, we believe the best moments are shared over
              delicious food and great drinks. Located in the heart of
              Reykjavík, our cozy spot offers a little bit of everything—from
              hearty meals to shareable bites, refreshing cocktails, and
              everything in between. Our menu is inspired by comfort classics
              with a modern twist, made fresh from locally sourced ingredients.
              Whether you’re stopping by for a casual lunch, a lively happy
              hour, or an intimate dinner, Lil&apos;bits is here to make every
              visit special. Come for the food, stay for the vibe—because life’s
              best moments come in little bits.
            </p>
            <div className="w-full mt-10 lg:mt-36">
              <div className="text-center justify-center border-2 border-black h-60 p-4 w-full md:w-5/6 md:ml-16">
                <p className="text-black mt-2 text-lg">
                  <strong>Start your order</strong>
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    className="px-4 py-2 mt-4 bg-[#C16757] text-white rounded-full transition duration-300 w-full hover:bg-[#A34A3F]"
                    onClick={handleNewOrder}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 text-black ml-4 sm:ml-10 md:ml-28 md:mt-10 md:w-5/6 lg:ml-36 lg:-mt-52">
        <h1 className="text-3xl font-bold mb-4 text-left">
          How to Reserve a Table at Lil&apos;bits
        </h1>
        <ol className="list-decimal pl-6">
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
        <p className="mt-6 text-left">
          Planning your perfect dining experience has never been simpler. Start
          your reservation today and get ready to enjoy the unforgettable
          flavors of Lil&apos;bits!
        </p>
      </div>
    </>
  );
};

export default HomePage;
