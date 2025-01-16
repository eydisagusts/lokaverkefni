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
    <div className="relative w-full max-w-4xl overflow-hidden mt-10">
      <div className="relative w-[700px] h-[350px] justify-start items-center mx-auto border border-black">
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
            width={700}
            height={450}
            priority
            className="object-cover w-full h-full"
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
    try {
      const response = await fetch(`http://localhost:3001/api/order/${email}`);
      const data = await response.json();
      if (!data.success) {
        console.error(data.error);
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
        if (data[0].dish) {
          const selectedImages = data[0].dish.slice(0, 4).map((dish) => dish.imageSource);
          setCarouselImages(selectedImages);
        } else {
          console.error("No dishes found in the response data");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="relative text-black">
        <Carousel carouselImages={carouselImages} />
        <div className="absolute top-0 right-0 mt-16 mr-24 text-center w-2/6 ">
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
        <div className="w-3/6 ml-36 mt-6 mb-36">
          <h1 className="text-3xl font-bold ml-20 mb-4">
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
      <div className="absolute -bottom-24 right-14 w-1/4 mr-24">
        <div className="text-center justify-center border-2 border-black h-72 mt-2">
          <p className="text-black mt-2 text-lg">Find your order</p>
          <div className="mt-8">
            <p className="text-black mb-2">Please enter your email</p>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-sm mt-1 text-black border-black"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className="px-4 py-2 mt-4 bg-[#C16757] text-white rounded-full transition duration-300"
              onClick={handleEmailSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;