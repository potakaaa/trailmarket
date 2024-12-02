import React from "react";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div
      className="home-container justify-center 
    items-center flex size-full
    border-black border-2
    "
    >
      <div
        className="category-title-container
      flex justify-center items-center
      bg-gradient-to-r from-[#252525] to-[#282667]
      flex-col rounded-xl w-5/6 height h-[120px]
      absolute top-10
      "
      >
        <h2 id="categories-label">Categories</h2>
        <p id="categories-sublabel">Pick one to simplify your search</p>
      </div>
      <div className="category-container">
        <div className="category-1">
          <div className="category-1-details"></div>
          <div className="category-1-pic"></div>
        </div>
        <div className="category-2">
          <div className="category-2-details"></div>
          <div className="category-2-pic"></div>
        </div>
        <div className="category-3">
          <div className="category-3-details"></div>
          <div className="category-3-pic"></div>
        </div>
        <div className="category-4">
          <div className="category-4-details"></div>
          <div className="category-4-pic"></div>
        </div>
        <div className="category-5">
          <div className="category-5-details"></div>
          <div className="category-5-pic"></div>
        </div>
        <div className="category-6">
          <div className="category-6-details"></div>
          <div className="category-6-pic"></div>
        </div>
        <div className="category-7">
          <div className="category-7-details"></div>
          <div className="category-7-pic"></div>
        </div>
        <div className="category-more"></div>
      </div>
    </div>
  );
};

export default HomePage;
