import "./LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div className="absolute bg-black bg-opacity-20 flex w-screen h-screen justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
