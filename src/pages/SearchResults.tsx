import React, { useState } from "react";
import TopNavBar from "./navbar/TopNavBar";
import NavBar from "./navbar/NavBar";
import { CategoryArray } from "./context/Globals";
import Dropdown from "./DropDown";
const kanye =
  "https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg";

const categories = ["Bags", "Accessories", "Clothes", "Gadgets"];

const SearchResults = () => {
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div className="flex flex-col">
      <TopNavBar />
      <NavBar />
      <div className="app-wrapper flex flex-col items-center justify-start min-h-screen w-full overflow-y-visible px-3">
        <div className="search-wrapper flex flex-col h-full w-full space-y-6 md:space-y-0 md:flex-row space-x-2 p-4">
          <div className="filter-sort flex flex-[1] bg-gray-50 h-full drop-shadow-xl rounded-xl p-4 z-10 justify-center">
            <div className="hidden Normal-filter-sort md:flex flex-col space-y-4 w-full h-full">
              <h1>Filter or Sort</h1>

              <div>
                <h1>By Tags</h1>
                <div className="space-y-2 lg:space-x-1">
                  {categories.map((category) => (
                    <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h1>By Price</h1>
                <div className="space-y-2 lg:space-x-1">
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    High To Low
                  </button>
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    Low To High
                  </button>
                </div>
              </div>

              <div>
                <h1>By Date</h1>
                <div className="space-y-2 lg:space-x-1">
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    Latest to Oldest
                  </button>
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    Oldest to Latest
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={categories}
                >
                  Tags
                </Dropdown>
              </div>
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={["High to Low", "Low to High"]}
                >
                  Price
                </Dropdown>
              </div>
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={["Latest to Oldest", "Oldest to Latest"]}
                >
                  Date
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="search-results flex flex-[3] bg-gray-50 drop-shadow-xl rounded-xl p-2 flex-col space-y-3">
            <h1>Search Results for :INPUTTED SEARCH:</h1>
            <div className=" result-container w-full flex items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2">
              <div className="PRODUCT-CONTAINER w-full space-y-3 flex flex-col">
                <div className="flex flex-[5] rounded-xl overflow-hidden aspect-square ">
                  <img src={kanye} className="object-cover"></img>
                </div>
                <div className="flex flex-[2] bg-zinc-900 rounded-xl p-4 flex-row">
                  <div className="left-side flex-[3] flex flex-col align-top">
                    <div className="flex flex-row align-middle space-x-2">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-black">
                        <img
                          className="object-cover h-full w-full"
                          src={kanye}
                        ></img>
                      </div>
                      <p className="text-xs align-middle text-white">
                        Username
                      </p>
                    </div>
                    <h2 className="text-white font-normal text-sm">
                      Product Name
                    </h2>
                  </div>
                  <div className="right-side flex flex-[2] flex-col justify-start text-right">
                    <h2 className="text-white text-2xl md:text-lg xl:text-2xl">
                      PHP $$$
                    </h2>
                    <h2 className="text-white font-normal text-sm md:text-xs xl:text-sm">
                      Stock available
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
