import "./LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div className="absolute flex w-screen h-screen justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
