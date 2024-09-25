import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMailOpen } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const ContactMe = ({ ContactInfo }) => {
  useEffect(() => {
    const updateAosAttributes = () => {
      const elements = document.querySelectorAll("[data-aos]");

      elements.forEach((element) => {
        if (window.innerWidth <= 768) {
          // Change the AOS attribute for mobile/tablet view
          if (element.getAttribute("data-aos") === "fade-right") {
            element.setAttribute("data-aos", "fade-up");
          }
          if (element.getAttribute("data-aos") === "fade-left") {
            element.setAttribute("data-aos", "fade-up");
          }
        } else {
          // Reset the AOS attribute for larger screens
          if (element.getAttribute("data-aos") === "fade-up") {
            if (element.classList.contains("card-left")) {
              element.setAttribute("data-aos", "fade-right");
            } else if (element.classList.contains("card-right")) {
              element.setAttribute("data-aos", "fade-left");
            }
          }
        }
      });

      // Reinitialize AOS to apply changes
      AOS.refresh();
    };

    // Initialize AOS
    AOS.init({
      duration: 1500,
      once: true,
    });

    // Apply AOS attribute changes based on screen size
    updateAosAttributes();

    // Listen for window resize and update the AOS attributes
    window.addEventListener("resize", updateAosAttributes);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateAosAttributes);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      icon: "info",
      title: "Functionality Unavailable",
      text: "This function is currently unavailable. Please contact us via email or phone.",
      confirmButtonText: "OK",
    });
    console.log(data);
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 to-white py-40">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center">
          <p className="text-5xl font-bold text-blue-500">Contact Me</p>
          <div className="bg-black p-[2px] w-[300px] mx-auto"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row py-10 gap-10 md:gap-20">
          {/* Cards */}
          <div className="w-full md:w-1/2 space-y-6 text-black">
            {ContactInfo.map((info) => (
              <div
                key={info.id}
                className={`card-left shadow-xl py-7 px-8 rounded-xl flex items-center bg-gradient-to-br from-blue-300 to-blue-50 transition transform hover:translate-y-[-5px] hover:shadow-2xl duration-300 ease-in-out`}
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="bg-blue-500 p-6 rounded-full text-white text-4xl">
                  {info.iconType === "phone" && <FaPhoneAlt />}
                  {info.iconType === "email" && <IoIosMailOpen />}
                  {info.iconType === "location" && <FaLocationDot />}
                </div>
                <div className="ml-5">
                  <p className="font-bold text-xl text-blue-500">
                    {info.title}
                  </p>
                  {Array.isArray(info.details) ? (
                    info.details.map((detail, index) => (
                      <p key={index} className="pt-1">
                        {detail}
                      </p>
                    ))
                  ) : (
                    <p className="pt-1">{info.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Me Form */}
          <div
            className="card-right w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-100 rounded-xl shadow-2xl p-5"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom"
          >
            <p className="font-bold text-3xl mb-4 text-white">Get In Touch</p>
            <form onSubmit={handleSubmit(onSubmit)} className="text-black">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full bg-white"
                />
                {errors.name && (
                  <p className="text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full bg-white"
                />
                {errors.email && (
                  <p className="text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  {...register("message", { required: "Message is required" })}
                  className="input input-bordered w-full bg-white p-2 h-48"
                />
                {errors.message && (
                  <p className="text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
