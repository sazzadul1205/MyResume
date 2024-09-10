import AboutMe from "./AboutMe/AboutMe";
import Banners from "./Banners/Banners";
import ContactMe from "./ContactMe/ContactMe";
import MyProjects from "./MyProjects/MyProjects";
import MySelf from "./MySelf/MySelf";
import MySkills from "./MySkills/MySkills";

const Home = () => {
  return (
    <div className="">
      <section id="banners">
        <Banners />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="myself">
        <MySelf />
      </section>
      <section id="projects">
        <MyProjects />
      </section>
      <section id="skills">
        <MySkills />
      </section>
      <section id="contact">
        <ContactMe />
      </section>
    </div>
  );
};

export default Home;
