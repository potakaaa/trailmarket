import "./HomePage.css";

const HomePage = () => {
  return (
    <div
      className="home-container 
      justify-center items-center flex flex-col size-full
    border-black border-2
    "
    >
      <div
        className="category-title-container
      flex justify-center items-center
      bg-gradient-to-r from-[#252525] to-[#282667]
      flex-col  w-full height h-[80px] m-0 p-5 
      sm:m-5 sm:rounded-xl sm:w-5/6
      
      
      "
      >
        <h2
          id="categories-label"
          className="
        text-white text-3xl sm:text-4xl font-medium
        "
        >
          CATEGORIES
        </h2>
        <p
          id="categories-sublabel"
          className="
        text-[#b9b9b9] text-[13px] font-normal
        text-center
        "
        >
          Pick one to simplify your search
        </p>
      </div>
      <div
        className="category-container 
      border-red-600 border-2 m-1
      "
      ></div>
    </div>
  );
};

export default HomePage;
