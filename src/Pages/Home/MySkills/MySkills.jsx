import { useState, useEffect } from "react";
import { FaCss3, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { IoLogoFirebase } from "react-icons/io5";
import { SiExpress, SiMongodb } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";

const MySkills = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  // State to control each skill's progress
  const [htmlProgress, setHtmlProgress] = useState(0);
  const [cssProgress, setCssProgress] = useState(0);
  const [jsProgress, setJsProgress] = useState(0);
  const [reactProgress, setReactProgress] = useState(0);
  const [firebaseProgress, setFirebaseProgress] = useState(0);
  const [nodeProgress, setNodeProgress] = useState(0);
  const [expressProgress, setExpressProgress] = useState(0);
  const [mongoProgress, setMongoProgress] = useState(0);

  // Function to animate progress bars
  useEffect(() => {
    const interval = setInterval(() => {
      setHtmlProgress((prev) => Math.min(prev + 1, 85));
      setCssProgress((prev) => Math.min(prev + 1, 90));
      setJsProgress((prev) => Math.min(prev + 1, 75));
      setReactProgress((prev) => Math.min(prev + 1, 80));
      setFirebaseProgress((prev) => Math.min(prev + 1, 40));
      setNodeProgress((prev) => Math.min(prev + 1, 75));
      setExpressProgress((prev) => Math.min(prev + 1, 50));
      setMongoProgress((prev) => Math.min(prev + 1, 85));
    }, 20); // Adjust the speed of the progress animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-blue-400 lg:py-40">
      <div
        className="lg:w-[1200px] mx-auto bg-gradient-to-br from-white to-blue-400 py-20 lg:px-20 rounded-2xl"
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-once="false"
      >
        {/* Title */}
        <div>
          <p className="text-center text-5xl font-bold text-blue-500">
            My Skills
          </p>
          <div className="bg-black p-[2px] w-[300px] mx-auto"></div>
        </div>
        {/* Leader */}
        <div className="text-left flex flex-col md:flex-row justify-between items-center md:gap-20 pt-10">
          {/* Container 1 */}
          <div className="mb-10">
            <div className="flex mb-5 items-center">
              <FaHtml5 className="text-4xl mr-5 text-orange-500" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={htmlProgress}
                max="100"
              ></progress>
            </div>
            <div className="flex mb-5 items-center">
              <FaCss3 className="text-4xl mr-5 text-blue-500" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={cssProgress}
                max="100"
              ></progress>
            </div>
            <div className="flex mb-5 items-center">
              <IoLogoJavascript className="text-4xl mr-5 text-yellow-500" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={jsProgress}
                max="100"
              ></progress>
            </div>
            <div className="flex mb-5 items-center">
              <FaReact className="text-4xl mr-5 text-blue-400" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={reactProgress}
                max="100"
              ></progress>
            </div>
          </div>

          {/* Container 2 */}
          <div>
            <div className="flex mb-5 items-center">
              <IoLogoFirebase className="text-4xl mr-5 text-yellow-400" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={firebaseProgress}
                max="100"
              ></progress>
            </div>
            <div className="flex mb-5 items-center">
              <FaNodeJs className="text-4xl mr-5 text-yellow-500" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={nodeProgress}
                max="100"
              ></progress>
            </div>
            <div className="flex mb-5 items-center">
              <SiExpress className="text-4xl mr-5 text-blue-500" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={expressProgress}
                max="100"
              ></progress>
            </div>
            <div className="flex mb-5 items-center">
              <SiMongodb className="text-4xl mr-5 text-green-500" />
              <progress
                className="progress progress-info w-56 lg:w-96 h-5 border border-blue-400"
                value={mongoProgress}
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySkills;
