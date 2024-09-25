import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AboutMe from "./AboutMe/AboutMe";
import Banners from "./Banners/Banners";
import ContactMe from "./ContactMe/ContactMe";
import MyProjects from "./MyProjects/MyProjects";
import MySelf from "./MySelf/MySelf";
import MySkills from "./MySkills/MySkills";
import Loader from "../Components/Loader";

const Home = () => {
  const axiosPublic = useAxiosPublic();

  // Fetching Banner
  const {
    data: BannerData,
    isLoading: BannerIsLoading,
    error: BannerError,
  } = useQuery({
    queryKey: ["Banner"],
    queryFn: () => axiosPublic.get(`/Banner`).then((res) => res.data),
  });

  // Fetching User Data
  const {
    data: UserData,
    isLoading: UserDataIsLoading,
    error: UserDataError,
  } = useQuery({
    queryKey: ["UserData"],
    queryFn: () => axiosPublic.get(`/UserData`).then((res) => res.data),
  });

  // Fetching MySelf Data
  const {
    data: MySelfData,
    isLoading: MySelfIsLoading,
    error: MySelfError,
  } = useQuery({
    queryKey: ["MySelf"],
    queryFn: () => axiosPublic.get(`/MySelf`).then((res) => res.data),
  });

  // Fetching MyProject Data
  const {
    data: MyProject = [], // Default to empty array if data is undefined
    isLoading: MyProjectLoading,
    error: MyProjectError,
  } = useQuery({
    queryKey: ["MyProject"],
    queryFn: () => axiosPublic.get(`/MyProject`).then((res) => res.data),
  });

  // Fetching ContactInfo Data
  const {
    data: ContactInfo = [], // Default to empty array if data is undefined
    isLoading: ContactInfoLoading,
    error: ContactInfoError,
  } = useQuery({
    queryKey: ["ContactInfo"],
    queryFn: () => axiosPublic.get(`/ContactInfo`).then((res) => res.data),
  });

  // Loading state
  if (
    BannerIsLoading ||
    UserDataIsLoading ||
    MySelfIsLoading ||
    MyProjectLoading ||
    ContactInfoLoading
  ) {
    return <Loader />;
  }

  // Error state
  if (
    BannerError ||
    UserDataError ||
    MySelfError ||
    MyProjectError ||
    ContactInfoError
  ) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-white">
        <p className="text-center text-red-500 font-bold text-3xl mb-8">
          Something went wrong. Please reload the page.
        </p>
        <button
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition duration-300"
          onClick={() => window.location.reload()} // Inline reload function
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div>
      <section id="banners">
        <Banners BannerData={BannerData} />
      </section>
      <section id="about">
        <AboutMe UserData={UserData} />
      </section>
      <section id="myself">
        <MySelf MySelfData={MySelfData} />
      </section>
      <section id="projects">
        <MyProjects MyProject={MyProject} />
      </section>
      <section id="skills">
        <MySkills />
      </section>
      <section id="contact">
        <ContactMe ContactInfo={ContactInfo} />
      </section>
    </div>
  );
};

export default Home;
