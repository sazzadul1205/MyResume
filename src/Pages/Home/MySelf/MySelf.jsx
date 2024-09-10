import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Loader from "../../Components/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MySelf = () => {
  const axiosPublic = useAxiosPublic();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  // Fetching User Data
  const {
    data: MySelfData, // Adjusted to match array data structure
    isLoading: MySelfIsLoading,
    error: MySelfError,
  } = useQuery({
    queryKey: ["MySelf"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/MySelf`);
      return res.data;
    },
  });

  // Loading state
  if (MySelfIsLoading) {
    return <Loader />;
  }

  // Error state
  if (MySelfError) {
    return <p>Error loading data: {MySelfError.message}</p>;
  }

  // Extract the data since it's an array (assuming only one entry in the array)
  const MySelf = MySelfData[0];

  return (
    <div className="bg-gradient-to-b from-white to-blue-400 py-40">
      <div
        className="mx-auto w-[1200px] text-black"
        data-aos="fade-left"
        data-aos-delay="300"
        data-aos-once="false"
      >
        <div className="px-10 py-14 bg-blue-400 rounded-2xl shadow-2xl flex gap-10 items-center">
          {/* Rendering the image from the local JSON data */}
          <img
            src={MySelf.imageUrl}
            alt={MySelf.name}
            className="w-[400px] h-[500px] rounded-full"
          />
          <div>
            <div className="text-white">
              <h1 className="text-4xl font-bold">About Me</h1>
              {/* Rendering dynamic data from the JSON object */}
              <p className="text-lg leading-relaxed">
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

export default MySelf;
