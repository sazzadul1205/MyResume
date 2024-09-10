const Footer = () => {
  return (
    <div className="mx-auto bg-white text-black">
      <footer className="footer footer-center  py-5">
        <aside>
          <p className="text-xl">
            Copyright © {new Date().getFullYear()} - All right reserved by Sazzadul Resume
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
