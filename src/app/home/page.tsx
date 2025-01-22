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
      <div className="relative w-full h-[200px] md:w-[500px] md:h-[350px] sm:w-[200px] sm:h-[200px] mx-auto border border-black">
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
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if an email is provided as a slug
    const emailFromSlug = searchParams.get("email");
    if (emailFromSlug) {
      router.push(`/pick-dish?email=${emailFromSlug}`);
    }
  }, [searchParams, router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      alert("Please enter an email.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/order/${email}`);
      const data = await response.json();
      if (!data.success) {
        alert("Order not found for the provided email.");
      } else {
        router.push(`/pick-dish?email=${email}`);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      alert("An error occurred while checking your email.");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders");
        const data = await response.json();
        if (data.length > 0 && data[0].dish) {
          setCarouselImages(
            data[0].dish.slice(0, 3).map((dish) => dish.imageSource)
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
  }

  return (
    <>
      <div className="relative text-black space-y-8 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/2">
            <Carousel carouselImages={carouselImages} />
          </div>
          <div className="lg:w-2/5 flex flex-col justify-center items-start text-center mt-20 md:w-3/4 ml-20 ">
            <h1 className="lg:font-bold mb-2 text-2xl ml-36">Welcome to Lil&apos;bits!</h1>
            <p className="m:w-10 text-center">
              At Lil&apos;bits, we believe the best moments are shared over delicious
              food and great drinks. Located in the heart of Reykjavík, our cozy
              spot offers a little bit of everything—from hearty meals to
              shareable bites, refreshing cocktails, and everything in between.
              Our menu is inspired by comfort classics with a modern twist, made
              fresh from locally sourced ingredients. Whether you’re stopping by
              for a casual lunch, a lively happy hour, or an intimate dinner,
              Lil&apos;bits is here to make every visit special. Come for the food,
              stay for the vibe—because life’s best moments come in little bits.
            </p>
            <div className="w-full md:w-3/4 mt-8 mr-28 relative z-10">
              <div className="text-center justify-center border-2 border-black h-60 p-4 lg:mt-20 ml-16 w-full relative z-10">
                <p className="text-black mt-2 text-lg">Start your order</p>
                <div className="mt-8">
                  <div className="mt-10">
                    <div>
                      <button
                      type="button"
                      className="px-4 py-2 mt-4 bg-[#C16757] text-white rounded-full transition duration-300 w-full"
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
        </div>
        <div className="lg:absolute top-96">
        <div className="lg:w-2/5 md:w-3/4 ml-20 mb-36 ">
          <h1 className="text-3xl font-bold mb-4 text-center">
            How to Reserve a Table at Lil&apos;bits
          </h1>
          <ol className="list-decimal pl-4 md:pl-16">
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
          <p className="mt-6 text-center md:text-center">
            Planning your perfect dining experience has never been simpler.
            Start your reservation today and get ready to enjoy the
            unforgettable flavors of Lil&apos;bits!
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default HomePage;