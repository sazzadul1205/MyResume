import { Typewriter } from "react-simple-typewriter";
import { FaFacebook, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import PropTypes from "prop-types";

const AboutMe = ({ UserData }) => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
    if (UserData) {
      AOS.refresh(); 
    }
  }, [UserData]);

  const downloadResume = () => {
    const pdfUrl = "../../assets/Sazzadul_Islam_Molla_Resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Sazzadul Islam Molla's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-white py-40">
      <div
        className="mx-auto max-w-6xl px-4 text-black"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-once="false"
      >
        {/* Top Section */}
        {UserData && UserData.length > 0 && (
          <>
            <h1 className="text-2xl border-l-4 pl-2 border-[#1206f1]">
              Hi! I am{" "}
              <span className="text-blue-800 font-bold text-4xl ml-5">
                {UserData[0].name}
              </span>
            </h1>
            {/* Typewriter */}
            <div>
              <p className="text-3xl md:text-5xl text-blue-800 py-3 font-bold">
                <Typewriter
                  words={UserData[0].jobTitles || []}
                  loop={false}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={60}
                  delaySpeed={1000}
                />
              </p>
            </div>
            {/* Description */}
            <div className="text-lg pt-5">
              {UserData[0].description && UserData[0].description.length > 0 ? (
                UserData[0].description.map((paragraph, index) => (
                  <p className="py-2 leading-relaxed text-center md:text-left" key={index}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>No description available.</p>
              )}
            </div>
            {/* Social Links and Resume Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10">
              {/* Social Icons */}
              <div className="flex space-x-4 mb-4 md:mb-0">
                {UserData[0].socialLinks?.facebook && (
                  <a
                    href={UserData[0].socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-xl btn-circle btn-outline"
                  >
                    <FaFacebook className="text-[#4267B2]" />
                  </a>
                )}
                {UserData[0].socialLinks?.github && (
                  <a
                    href={UserData[0].socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-xl btn-circle btn-outline"
                  >
                    <FaGithub className="text-[#171515]" />
                  </a>
                )}
                {UserData[0].socialLinks?.twitter && (
                  <a
                    href={UserData[0].socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-xl btn-circle btn-outline"
                  >
                    <FaTwitter className="text-blue-400" />
                  </a>
                )}
                {UserData[0].socialLinks?.linkedin && (
                  <a
                    href={UserData[0].socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-xl btn-circle btn-outline"
                  >
                    <FaLinkedin className="text-[#0077b5]" />
                  </a>
                )}
              </div>
              {/* Resume Button */}
              {UserData[0].resumeLink && (
                <button
                  onClick={downloadResume}
                  className="w-full md:w-auto py-3 px-5 bg-blue-500 hover:bg-blue-600 text-white hover:text-white rounded-3xl text-xl text-center"
                >
                  Download Resume
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// PropTypes validation
AboutMe.propTypes = {
  UserData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      jobTitles: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.arrayOf(PropTypes.string),
      socialLinks: PropTypes.shape({
        facebook: PropTypes.string,
        github: PropTypes.string,
        twitter: PropTypes.string,
        linkedin: PropTypes.string,
      }),
      resumeLink: PropTypes.string,
    })
  ).isRequired,
};

export default AboutMe;
