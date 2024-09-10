import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("banners");

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Smooth Scroll to Section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // Set the active section when clicked
    }
  };

  const renderNav = () => (
    <>
      <li>
        <button
          onClick={() => scrollToSection("banners")}
          className={`${
            activeSection === "banners"
              ? "text-blue-500"
              : "text-black hover:text-blue-500"
          }`}
        >
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("about")}
          className={`${
            activeSection === "about"
              ? "text-blue-500"
              : "text-black hover:text-blue-500"
          }`}
        >
          About Me
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("myself")}
          className={`${
            activeSection === "myself"
              ? "text-blue-500"
              : "text-black hover:text-blue-500"
          }`}
        >
          My Self
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("projects")}
          className={`${
            activeSection === "projects"
              ? "text-blue-500"
              : "text-black hover:text-blue-500"
          }`}
        >
          Projects
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("skills")}
          className={`${
            activeSection === "skills"
              ? "text-blue-500"
              : "text-black hover:text-blue-500"
          }`}
        >
          Skills
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("contact")}
          className={`${
            activeSection === "contact"
              ? "text-blue-500"
              : "text-black hover:text-blue-500"
          }`}
        >
          Contact
        </button>
      </li>
    </>
  );

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
    <div
      className={`navbar fixed top-0 left-0 w-full z-50 lg:px-[350px] mx-auto text-black transition-colors duration-300 ${
        scrollPosition > 50 ? "bg-white shadow-lg" : "bg-blue-200"
      }`}
    >
      <div className="navbar max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <button
              aria-label="Toggle menu"
              className="btn btn-ghost"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 font-semibold"
              >
                {renderNav()}
              </ul>
            )}
          </div>
          <div className="text-3xl font-bold italic">
            <p
              className="text-center text-4xl font-bold py-4"
              style={{
                background:
                  "linear-gradient(to right, #3512CF 0%, #CF0775 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sazzadul
            </p>
          </div>
        </div>

        {/* Navbar Center (Desktop Links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-5 px-1 space-x-5 font-semibold text-lg">
            {renderNav()}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <button
            className=" text-white px-10 py-4 rounded-full bg-blue-500 hover:bg-blue-300 hover:text-black font-semibold "
            onClick={downloadResume}
          >
            Get Resume {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
