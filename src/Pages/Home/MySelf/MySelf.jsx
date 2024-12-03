import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import PropTypes from "prop-types";

const MySelf = ({ MySelfData }) => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  // Extract the data since it's an array (assuming only one entry in the array)
  const MySelf = MySelfData[0];

  return (
    <div className="lg:py-40">
      <div
        className="mx-auto   text-white"
        data-aos="fade-left"
        data-aos-delay="300"
        data-aos-once="false"
      >
        <div className="px-1 md:px-10 py-14 bg-gradient-to-br from-blue-400 to-blue-300 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-10 items-center opacity-80 max-w-[1200px] mx-auto">
          {/* Rendering the image from the local JSON data */}
          <img
            src={MySelf.imageUrl}
            alt={MySelf.name}
            className="w-[400px] h-[500px] rounded-full"
          />
          <div>
            <div className="text-white">
              <h1 className="text-4xl font-bold text-center md:text-left">About Me</h1>
              {/* Rendering dynamic data from the JSON object */}
              <p className="text-lg leading-relaxed text-center md:text-left">
                My name is {MySelf.name}, and I am currently pursuing{" "}
                {MySelf.education}.
                <br />
                <br />
                {MySelf.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
MySelf.propTypes = {
  MySelfData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      education: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MySelf;
