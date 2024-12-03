/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaGithub, FaLink } from "react-icons/fa";

const MyProjects = ({ MyProject }) => {
  const [modalContent, setModalContent] = useState(null); // To manage modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

  const openModal = (versions) => {
    setModalContent(versions); // Set versions to show in the modal
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setModalContent(null); // Reset modal content
  };

  return (
    <div className="py-20 sm:py-40">
      <div className="py-10">
        <p className="text-center text-3xl sm:text-5xl font-bold text-blue-500">
          My Projects
        </p>
        <div className="bg-black p-[2px] w-[150px] sm:w-[300px] mx-auto"></div>
      </div>

      <div className="w-full sm:w-[1200px] mx-auto px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {MyProject.map((project, index) => (
          <div
            key={index}
            className="relative bg-white text-black shadow-xl rounded-lg overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-40 sm:h-52"
            />
            <div className="p-4 bg-black">
              <p className="text-gray-400 text-sm">ReactJS Project</p>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl text-white">
                  {project.title}
                </h3>
                {project.versions && project.versions.length > 0 && (
                  <button
                    onClick={() => openModal(project.versions)}
                    className="text-white bg-black p-2 rounded-full"
                  >
                    View Versions
                  </button>
                )}
              </div>
            </div>
            <div className="absolute top-2 right-2 space-x-2">
              <NavLink to={project.liveLink} target="_blank">
                <button className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600">
                  <FaLink />
                </button>
              </NavLink>
              <NavLink to={project.githubLink} target="_blank">
                <button className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600">
                  <FaGithub />
                </button>
              </NavLink>
              <button className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600">
                <FaEye />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <VersionModal versions={modalContent} closeModal={closeModal} />
      )}
    </div>
  );
};

const VersionModal = ({ versions, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Previous Versions</h2>
        <div className="space-y-4">
          {versions.map((version, index) => (
            <div key={index} className="py-2">
              <p className="font-bold">{version.title}</p>
              <div className="flex space-x-2">
                <NavLink to={version.liveLink} target="_blank">
                  <button className="text-blue-500 hover:underline">
                    Live Link
                  </button>
                </NavLink>
                <NavLink to={version.githubLink} target="_blank">
                  <button className="text-blue-500 hover:underline">
                    GitHub
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white rounded-full p-2 w-full hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MyProjects;
