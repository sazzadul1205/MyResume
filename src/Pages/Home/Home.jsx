import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AboutMe from "./AboutMe/AboutMe";
import ContactMe from "./ContactMe/ContactMe";
import MyProjects from "./MyProjects/MyProjects";
import MySelf from "./MySelf/MySelf";
import Loader from "../Components/Loader";
import background from "../../assets/Background.jfif";
import Skills from "./Skills/Skills";

const Home = () => {
  const axiosPublic = useAxiosPublic();

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
    data: Projects = [],
    isLoading: ProjectsLoading,
    error: ProjectsError,
  } = useQuery({
    queryKey: ["Projects"],
    queryFn: () => axiosPublic.get(`/Projects`).then((res) => res.data),
  });

  // Fetching ContactInfo Data
  const {
    data: ContactInfo = [],
    isLoading: ContactInfoLoading,
    error: ContactInfoError,
  } = useQuery({
    queryKey: ["ContactInfo"],
    queryFn: () => axiosPublic.get(`/ContactInfo`).then((res) => res.data),
  });

  // Loading state
  if (
    UserDataIsLoading ||
    MySelfIsLoading ||
    ProjectsLoading ||
    ContactInfoLoading
  ) {
    return <Loader />;
  }

  // Error state
  if (UserDataError || MySelfError || ProjectsError || ContactInfoError) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-white">
        <p className="text-center text-red-500 font-bold text-3xl mb-8">
          Something went wrong. Please reload the page.
        </p>
        <button
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition duration-300"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="min-h-screen"
    >
      {/* <section id="banners">
        <Banners BannerData={BannerData} />
      </section> */}
      <section id="about">
        <AboutMe UserData={UserData} />
      </section>
      <section id="myself">
        <MySelf MySelfData={MySelfData} />
      </section>
      <section id="projects">
        <MyProjects MyProject={Projects} />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="contact">
        <ContactMe ContactInfo={ContactInfo} />
      </section>
    </div>
  );
};

export default Home;
