import "./LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div className="absolute flex w-screen h-screen justify-center items-center bg-black bg-opacity-30">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
