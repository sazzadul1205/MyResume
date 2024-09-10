import { FidgetSpinner } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="bg-white flex justify-center items-center ">
      <div className="max-w-[1200px] mx-auto">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
