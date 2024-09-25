const Loader = () => (
  <div className="bg-gradient-to-b from-blue-300 to-white flex justify-center items-center h-screen">
    <div className="text-blue-500 text-5xl font-bold flex space-x-2">
      <p>Loading</p>
      <div className="flex space-x-1 pt-1">
        <span className="dot dot1">.</span>
        <span className="dot dot2">.</span>
        <span className="dot dot3">.</span>
      </div>
    </div>
    <style jsx>{`
      .dot {
        animation: bounce 1.5s infinite;
        font-size: 5xl;
      }
      .dot1 {
        animation-delay: 0s;
      }
      .dot2 {
        animation-delay: 0.3s;
      }
      .dot3 {
        animation-delay: 0.6s;
      }
      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `}</style>
  </div>
);

export default Loader;
