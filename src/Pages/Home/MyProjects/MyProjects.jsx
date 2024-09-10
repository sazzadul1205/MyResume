import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaGithub, FaSearch, FaShare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Loader from "../../Components/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MyProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null); // To track selected project
  const axiosPublic = useAxiosPublic();

  // Function to open modal and set selected project
  const handleViewMore = (project) => {
    setSelectedProject(project);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Fetching User Data
  const {
    data: MyProject = [], // Default to empty array if data is undefined
    isLoading: MyProjectLoading,
    error: MyProjectError,
  } = useQuery({
    queryKey: ["MyProject"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/MyProject`);
      return res.data;
    },
  });

  // Loading state
  if (MyProjectLoading) {
    return <Loader />;
  }

  // Error state
  if (MyProjectError) {
    return <p>Error loading data: {MyProjectError.message}</p>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-400 to-white py-40">
      <div className="py-10">
        <p className="text-center text-5xl font-bold text-blue-200">
          My Projects
        </p>
        <div className="bg-black p-[2px] w-[300px] mx-auto"></div>
      </div>

      <div className="w-[1200px] mx-auto">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {MyProject.map((project, index) => (
            <SwiperSlide
              key={index}
              className="card bg-white text-black w-96 shadow-xl pb-10"
            >
              <figure>
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-52"
                />
              </figure>
              <div className="bg-gradient-to-br from-blue-300 to-blue-50">
                <div className="card-body h-[300px] flex flex-col justify-between">
                  <h2 className="card-title font-bold text-blue-500">
                    {project.title}
                  </h2>
                  <p className="leading-relaxed text-ellipsis overflow-hidden h-[70px]">
                    {project.description}
                  </p>
                </div>
                <div className="card-actions flex justify-evenly text-white mt-5 pb-5">
                  <NavLink to={project.liveLink} target="_blank">
                    <button className="px-7 py-3 text-black border border-blue-500 rounded-2xl flex items-center hover:bg-blue-500 hover:text-white w-40 text-center">
                      <FaShare className="mr-2" /> Live Link
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleViewMore(project)}
                    className="px-7 py-3 text-black border border-blue-500 rounded-2xl flex items-center hover:bg-blue-500 hover:text-white w-40 text-center"
                  >
                    <FaSearch className="mr-2" /> View More
                  </button>
                  <NavLink to={project.githubLink} target="_blank">
                    <button className="px-7 py-3 text-black border border-blue-500 rounded-2xl flex items-center hover:bg-blue-500 hover:text-white w-40 text-center">
                      <FaGithub className="mr-2" /> Client
                    </button>
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal for displaying project details */}
      {selectedProject && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          aria-labelledby="project_modal_title"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
          <div className="bg-white p-6 rounded-lg relative z-10 max-w-4xl mx-auto">
            <h3 id="project_modal_title" className="font-bold text-lg">
              {selectedProject.title}
            </h3>
            <p className="py-4">{selectedProject.description}</p>

            {/* Displaying project content details */}
            {selectedProject.content &&
            Array.isArray(selectedProject.content) ? (
              <div className="overflow-y-auto max-h-96">
                {selectedProject.content.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-md mt-4">{section.title}</h4>
                    <ul className="list-disc ml-5">
                      {section.features?.map((feature, i) => (
                        <li key={i} className="py-1">
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Handling nested sections like in the dashboard */}
                    {section.sections && (
                      <div>
                        {section.sections.map((subSection, subIndex) => (
                          <div key={subIndex}>
                            <h5 className="font-bold text-md mt-4">
                              {subSection.title}
                            </h5>
                            <ul className="list-disc ml-5">
                              {subSection.features?.map(
                                (feature, subFeatureIndex) => (
                                  <li key={subFeatureIndex} className="py-1">
                                    {feature}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No additional content available for this project.</p>
            )}

            {/* Modal action buttons */}
            <div className="mt-4">
              <button className="btn btn-primary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
