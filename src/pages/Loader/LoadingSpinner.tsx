import "./LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="absolute flex size-full justify-center items-center bg-black bg-opacity-30">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
