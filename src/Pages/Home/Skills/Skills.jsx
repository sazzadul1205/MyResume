import {
  FaCss3,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { SiDaisyui, SiExpress, SiMongodb, SiMongoose } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { DiVisualstudio } from "react-icons/di";

import ChatGPT from "../../../assets/chatgpt.png";

const Skills = () => {
  const skills = [
    { icon: <FaHtml5 className="text-[#EC6231]" />, name: "HTML 5" },
    { icon: <FaCss3 className="text-[#264de4]" />, name: "CSS 3" },
    {
      icon: <IoLogoJavascript className="text-[#F0DB4F]" />,
      name: "JavaScript",
    },
    { icon: <FaReact className="text-[#61DBFB]" />, name: "React JS" },
    { icon: <IoLogoFirebase className="text-[#FFC400]" />, name: "Firebase" },
    { icon: <SiExpress className="text-[#68a063]" />, name: "Express JS" },
    { icon: <FaNodeJs className="text-[#3C873A]" />, name: "Node JS" },
    { icon: <FaVuejs className="text-[#34495E]" />, name: "Vue" },
    { icon: <FaGithub className="text-[#000000]" />, name: "Github" },
    {
      icon: <RiTailwindCssFill className="text-[#06b6d4]" />,
      name: "Tailwind",
    },
    { icon: <SiDaisyui className="text-[#06b6d4]" />, name: "Daisy UI" },
    {
      icon: <DiVisualstudio className="text-[#0098FF]" />,
      name: "Visual Studio Code",
    },
    { icon: <SiMongoose className="text-orange-500" />, name: "Mongoose" },
    {
      icon: <img src={ChatGPT} className="w-12" alt="ChatGPT" />,
      name: "Chat GPT",
    },
    { icon: <SiMongodb className="text-green-600" />, name: "MongoDB Atlas" },
    { icon: <IoLogoVercel className="text-black" />, name: "Vercel" },
    { icon: <RiNextjsFill className="text-black" />, name: "NextJS" },
  ];

  return (
    <div className="py-20 lg:px-20 rounded-2xl bg-white">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-center text-5xl font-bold text-blue-500">
          My Skills
        </p>
        <div className="bg-black p-[2px] w-[300px] mx-auto"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 pt-10">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative group flex items-center justify-center bg-white p-8 h-[100px] w-full border-b-2 border-blue-700"
            >
              <div className="text-5xl transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                {skill.icon}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
