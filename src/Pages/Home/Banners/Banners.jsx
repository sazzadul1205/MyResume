import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Banners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosPublic = useAxiosPublic();

  // Fetching Banner
  const {
    data: BannerData,
    isLoading: BannerIsLoading,
    error: BannerError,
  } = useQuery({
    queryKey: ["Banner"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/Banner`);
      return res.data;
    },
  });

  // Automatically change the banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change every 5000ms (5 seconds)

    return () => clearInterval(interval); // Clear interval when unmounted
  }, [currentIndex, BannerData]); // Add BannerData as a dependency

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? BannerData.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === BannerData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Loading state
  if (BannerIsLoading) {
    return <Loader />;
  }

  // Error state
  if (BannerError) {
    return <p>Error loading data: {BannerError.message}</p>;
  }

  return (
    <div className="bg-blue-300 py-40">
      <div className="relative w-[1200px] mx-auto h-[700px]">
        {/* Dynamic Image */}
        <img
          key={BannerData[currentIndex].image} // Prevent image flicker
          src={BannerData[currentIndex].image}
          alt={BannerData[currentIndex].caption}
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Caption Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-5xl font-bold text-white shadow-2xl">
            {BannerData[currentIndex].caption}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bg-white w-full px-10 h-20 bottom-0 flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="p-4 px-10 bg-blue-500 text-white font-bold rounded-3xl hover:bg-blue-600 flex items-center"
            aria-label="Previous banner"
          >
            <FaArrowLeft className="mr-3" />
            <span>LEFT</span>
          </button>

          <button
            onClick={handleNext}
            className="p-4 px-10 bg-blue-500 text-white font-bold rounded-3xl hover:bg-blue-600 flex items-center"
            aria-label="Next banner"
          >
            <span className="mr-3">RIGHT</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banners;
