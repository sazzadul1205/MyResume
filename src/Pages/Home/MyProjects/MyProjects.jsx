import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaGithub, FaSearch, FaShare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MyProjects = ({ MyProject }) => {
  const [selectedProject, setSelectedProject] = useState(null); // To track selected project

  // Function to open modal and set selected project
  const handleViewMore = (project) => {
    setSelectedProject(project);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 to-white py-20 sm:py-40">
      <div className="py-10">
        <p className="text-center text-3xl sm:text-5xl font-bold text-blue-500">
          My Projects
        </p>
        <div className="bg-black p-[2px] w-[150px] sm:w-[300px] mx-auto"></div>
      </div>

      <div className="w-full sm:w-[1200px] mx-auto px-4 sm:px-0">
        <Swiper
          slidesPerView={1} // Default to 1 slide for mobile
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 1, // Single slide on small mobile
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3, // 3 slides on larger screens
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {MyProject.map((project, index) => (
            <SwiperSlide
              key={index}
              className="card bg-white text-black w-96 md:w-full shadow-xl pb-10"
            >
              <figure>
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-40 sm:h-52"
                />
              </figure>
              <div className="bg-gradient-to-br from-blue-300 to-blue-50">
                <div className="card-body h-[250px] sm:h-[300px] flex flex-col justify-between">
                  <h2 className="card-title font-bold text-blue-500">
                    {project.title}
                  </h2>
                  <p className="leading-relaxed text-ellipsis overflow-hidden h-[50px] sm:h-[70px]">
                    {project.description}
                  </p>
                </div>
                <div className="card-actions flex flex-col md:flex-row justify-center mt-5 pb-5 text-black mx-4 md:text-lg gap-3">
                  <NavLink to={project.liveLink} target="_blank">
                    <button className="flex items-center px-5 py-2 md:px-7 md:py-3 border border-blue-500 rounded-3xl  hover:bg-blue-500 hover:text-white">
                      <FaShare className="mr-2" /> Live Link
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleViewMore(project)}
                    className="flex items-center px-5 py-2 md:px-7 md:py-3 border border-blue-500 rounded-3xl  hover:bg-blue-500 hover:text-white"
                  >
                    <FaSearch className="mr-2" /> View More
                  </button>
                  <NavLink to={project.githubLink} target="_blank">
                    <button className="flex items-center px-5 py-2 md:px-7 md:py-3 border border-blue-500 rounded-3xl  hover:bg-blue-500 hover:text-white">
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
          className="fixed inset-0 flex pt-16 pl-2 md:items-center md:justify-center z-50 text-black"
          aria-labelledby="project_modal_title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"
            onClick={handleCloseModal} // Close modal on backdrop click
            aria-hidden="true"
          ></div>
          <div className="bg-white p-4 sm:p-6 rounded-lg relative z-10 max-w-72 md:max-w-4xl mx-2 sm:mx-auto overflow-auto max-h-[80vh]">
            <h3 id="project_modal_title" className="font-bold text-lg">
              {selectedProject.title}
            </h3>
            <p className="py-4">{selectedProject.description}</p>

            {/* Displaying project content details */}
            {selectedProject.content &&
            Array.isArray(selectedProject.content) ? (
              <div className="overflow-y-auto max-h-60 sm:max-h-96">
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
              <button
                className="btn bg-blue-500 hover:bg-blue-400 border-none text-white w-full sm:w-40"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
MyProjects.propTypes = {
  MyProject: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      liveLink: PropTypes.string.isRequired,
      githubLink: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          features: PropTypes.arrayOf(PropTypes.string),
          sections: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              features: PropTypes.arrayOf(PropTypes.string),
            })
          ),
        })
      ),
    })
  ).isRequired,
};

export default MyProjects;
