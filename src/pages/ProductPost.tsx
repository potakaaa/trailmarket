import React from "react";
import Dropdown from "./DropDown";
const kanye =
  "https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg";
const kanyeArr = Array(4).fill(kanye);
const ProductPost = () => {
  return (
    <div className="app-wrapper bg-white flex flex-col items-center justify-center min-h-screen overflow-y-auto">
      <div className="post-page p-6 flex flex-col flex-1 h-full w-full rounded-xl">
        <div
          className="justify-center align-center flex bg-gradient-to-r from-[#26245f] to-[#18181b]
          text-white rounded-xl p-4"
        >
          <h1 className="text-xl">Post a Product</h1>
        </div>
        <div className="main-app flex w-full flex-col justify-center space-y-2 lg:flex-row space-x-2">
          <div className="left flex w-full h-full flex-col space-y-4">
            <div className="gen-info flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <h1 className="text-xl">General Information</h1>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label className="">Name of Product</label>
                  <input
                    id="name"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                    type="text"
                    placeholder="Make the product name stand out!"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="">Full Description</label>
                  <textarea
                    id="description"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500 min-h-56 max-h-96 resize-y "
                    placeholder="Enter the full description"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="">Short Description</label>
                  <input
                    id="short_desc"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                    type="text"
                    placeholder="Be concise, but poingnant"
                  />
                </div>
              </form>
            </div>
            <div className="pricing-stock flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <h1 className="text-xl">Pricing and Stock</h1>
              <form className="flex flex-row space-x-2">
                <div className="flex flex-col">
                  <label className="">Base Pricing</label>
                  <input
                    id="price"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500 w-full"
                    type="number"
                    placeholder="Input a number"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="">Stock</label>
                  <input
                    id="stock"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500  w-full"
                    type="number"
                    placeholder="Input a number"
                  />
                </div>
              </form>
              <div className="flex flex-col">
                <h1>Category</h1>
                <div className=" category-container flex flex-col space gap-x-2 space-y-3 md:flex-row justify-start items-start">
                  <div className=" flex-col md:flex-row flex space-y-2 md:space-x-2">
                    <Dropdown
                      buttonStyle="px-6 py-1 bg-white border-2 border-black rounded-xl h-full"
                      optionStyle="absolute bottom-full mb-1 left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                      onSelect={() => {}}
                      options={["Category 1", "Category 2", "Category 3"]}
                    >
                      Select Category
                    </Dropdown>

                    <form className="flex flex-row space-x-2 mt-0 justify-center items-center h-full">
                      <div className="flex flex-col items-center">
                        <input
                          id="name"
                          className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                          type="text"
                          placeholder="New Category"
                        />
                      </div>
                      <button className="border-2 flex border-black rounded-xl px-3 py-1">
                        Add Category
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right space-y-4 h-full flex flex-col md:flex-[1]">
            <div className="flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <div className="product-display flex-[3] flex flex-col rounded-2xl 2xl:flex-[3] xl:m-4">
                <div className="aspect-square bg-gray-200 rounded-lg shadow-md sm:m-4 md:m-2">
                  <img
                    className="h-full w- object-cover rounded-lg"
                    src={kanye}
                    alt="Product"
                  />
                </div>
                <div className="gallery grid grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-4 p-2 w-full sm:px-5 md:p-2">
                  {kanyeArr.map(() => (
                    <div className="bg-gray-100 rounded-lg border aspect-square shadow-sm">
                      <img
                        className="h-full w-full object-cover rounded-lg"
                        src={kanye}
                        alt="Product"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="uplaod">
                <input type="file" name="file" id="file" />
              </div>
            </div>
            <div className="disclaimer flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <p>
                By posting a product, you confirm ownership and the right to
                sell it. You agree to provide accurate descriptions and ensure
                the product complies with all laws. The platform may remove
                listings that violate these terms.
              </p>
            </div>

            <button className="bg-gradient-to-r from-[#26245f] to-[#18181b] text-white font-normal rounded-full w-full h-10 mt-3 self-end shadow-md">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
