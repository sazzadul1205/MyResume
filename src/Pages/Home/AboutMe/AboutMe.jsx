import { Typewriter } from "react-simple-typewriter";
import { FaFacebook, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Loader from "../../Components/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AboutMe = () => {
  const axiosPublic = useAxiosPublic();

  // Fetching User Data
  const {
    data: UserData,
    isLoading: UserDataIsLoading,
    error: UserDataError,
  } = useQuery({
    queryKey: ["UserData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/UserData`);
      return res.data;
    },
  });

  // Initialize AOS on component mount and data load
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
    if (UserData) {
      AOS.refresh(); // Refresh AOS after data load to apply animations properly
    }
  }, [UserData]);

  // Loading state
  if (UserDataIsLoading) {
    return <Loader />;
  }

  // Error state
  if (UserDataError) {
    return <p>Error loading data: {UserDataError.message}</p>;
  }

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
        className="mx-auto max-w-6xl px-4 text-black "
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
              <p className="text-5xl text-blue-800 py-3 font-bold">
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
                  <p className="py-2 leading-relaxed" key={index}>
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

export default AboutMe;
