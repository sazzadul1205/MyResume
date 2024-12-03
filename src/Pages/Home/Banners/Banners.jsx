import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Banners = ({ BannerData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change every 5000ms (5 seconds)

    return () => clearInterval(interval); // Clear interval when unmounted
  }, [currentIndex]); // Removed BannerData as it's likely static

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

  return (
    <div className=" py-20">
      <div className="relative mx-auto h-[600px] md:h-[900px]">
        {/* Dynamic Image */}
        <img
          key={BannerData[currentIndex].image} // Prevent image flicker
          src={BannerData[currentIndex].image}
          alt={BannerData[currentIndex].caption}
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Caption Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl md:text-5xl text-center font-bold text-white shadow-2xl">
            {BannerData[currentIndex].caption}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bg-black w-full md:px-10 h-20 bottom-0 opacity-50">
          <div className="flex justify-between items-center pt-5 max-w-[1200px] mx-auto">
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
    </div>
  );
};

// Add propTypes validation
Banners.propTypes = {
  BannerData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Banners;
