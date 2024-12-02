
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
      flex-col rounded-xl w-5/6 height h-[120px] mt-8
      
      "
      >
        <h2 id="categories-label">Categories</h2>
        <p id="categories-sublabel">Pick one to simplify your search</p>
      </div>
      <div
        className="category-container 
      flex flex-col w-full h-1/2
      border-red-600 border-2
      mt-5 justify-center items-center
      "
      >
        <div className="category-column-1 flex">
          <div
            className="category-1 
          border-black border-2
          w-1/6 flex-1
          "
          >
            <div className="category-1-details">deets 1</div>
            <div className="category-1-pic">pic</div>
          </div>
          <div
            className="category-2 
          border-black border-2
          w-1/6 flex-1"
          >
            <div className="category-2-details">deets 2</div>
            <div className="category-2-pic">pic</div>
          </div>
          <div
            className="category-3 
          border-black border-2 w-1/6 flex-1"
          >
            <div className="category-3-details">deets 3</div>
            <div className="category-3-pic">pic</div>
          </div>
          <div className="category-4 border-black border-2 w-1/6 flex-1">
            <div className="category-4-details">deets 4</div>
            <div className="category-4-pic">pic</div>
          </div>
        </div>
        <div className="category-column-2 flex ">
          <div className="category-5 border-black border-2 w-1/6 flex-1">
            <div className="category-5-details">deets 5</div>
            <div className="category-5-pic">pic</div>
          </div>
          <div className="category-6 border-black border-2 w-1/6 flex-1">
            <div className="category-6-details">deets 6</div>
            <div className="category-6-pic">pic</div>
          </div>
          <div className="category-7 border-black border-2 w-1/6 flex-1">
            <div className="category-7-details">deets 7</div>
            <div className="category-7-pic">pic</div>
          </div>
          <div className="category-more border-black border-2 w-1/6 flex-1">
            more
          </div>
        </div>
      </div>
    </div>
  );
};


               </div>
               <div className="category"></div>
               <div className="see-more"></div>
            </div>
        
        </div>
    );
}

export default HomePage;