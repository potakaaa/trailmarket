import { useState } from "react";
import TopNavBar from "./navbar/TopNavBar";
import { UserIcon } from "@heroicons/react/16/solid";
const ProductPage = () => {
  const [count, setCount] = useState(0);

  const loremPlaceholder =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
  const kanye =
    "https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg";
  const kanyeArr = Array(4).fill(kanye);
  const star = "http://www.w3.org/2000/svg";
  const starArr = Array(5).fill(star);

  const renderStars = () => {
    return starArr.map((_, index) => (
      <svg
        xmlns={star}
        fill={index > 3 ? "none" : "currentColor"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={index > 3 ? "h-4 w-4 text-gray-300" : "h-4 w-4 text-black"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    ));
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    if (count != 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="app-wrapper flex items-center justify-center min-h-screen overflow-scroll ">
        <div className="flex justify-center items-center">
          <div className="product-cntnr flex flex-col justify-center items-center h-auto w-[95vw] bg-white rounded-lg shadow-lg pb-2 2xl:pb-5">
            <div className="product-top flex flex-col md:flex-row flex-[3] w-full px-1 h-auto">
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
              <div className="flex flex-[4] flex-col">
                <div className="product-details flex-[5] flex flex-col xl:my-4 xl:mr-4 2xl:flex-[0]">
                  <div className="product-name flex-[1] 2xl:flex-[0] items-center justify-centerbg-gray-100 rounded-lg m-2 sm:m-5 md:mx-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-[4rem] ">
                      Product Name
                    </h1>
                    <h2 className="text-sm font-normal md:text-base xl:mt-3 xl:text-lg 2xl:text-xl">
                      {loremPlaceholder}
                    </h2>
                  </div>
                  <div className="product-price flex-[1] 2xl:flex-[0] items-center justify-center bg-gray-900 rounded-lg my-2 py-4 sm:mx-3 2xl:pl-4">
                    <h1 className="text-2xl md:text-4xl text-gray-100 mx-4 sm:mx-6 sm:text-3xl md:mx-7 md:my-3 xl:text-5xl 2xl:text-[4rem] 2xl:my-5">
                      PHP 400
                    </h1>
                    <div className="mt-2 mx-3 flex-row space-x-2 pb-2 sm:mx-5 sm:mt-3 md:mx-6 md:my-3 xl:my-5 2xl:my-8">
                      <button className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl">
                        Add to Cart
                      </button>
                      <button className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm 2xl:text-xl">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-bottom flex-col mr-7 ml-1 hidden 2xl:flex">
                  <div className="product-info flex flex-col items-start justify-start bg-gray-100 rounded-lg my-2 ml-2 p-4 mb-6">
                    <h1 className="mx-4 mt-1.5 text-4xl">
                      Product Information
                    </h1>
                    <p className="text-xs font-normal mx-4 xl:text-sm xl:ml-[18px]">
                      Product Details
                    </p>
                    <div className="flex flex-row space-x-2 m-2 w-full justify-between gap-7 md:mt-6">
                      <h2 className="mx-2.5 text-center text-lg flex justify-center items-center">
                        Category
                      </h2>
                      <div className="flex gap-3 flex-1">
                        {/* should be array here */}
                        <p className="px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center">
                          Bags
                        </p>
                        <p className="px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center">
                          Accessories
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-2 m-5 justify-between gap-16">
                      <h3 className="text-lg text-center flex justify-center items-center">
                        Quantity
                      </h3>
                      <div className="flex gap-2 flex-1 justify-center ">
                        <button
                          onClick={handleMinus}
                          className="flex px-8 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-20 text-base justify-center items-center text-center border-2 border-black rounded-full bg-gray [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={count}
                        />
                        <button
                          onClick={handlePlus}
                          className="px-8 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-reviews flex-[5] items-start justify-start bg-gray-100 rounded-lg p-5 ml-2">
                    <div className="flex flex-col mb-3">
                      <h1 className="mx-2 mt-1.5 text-4xl">Customer Reviews</h1>
                      <div className="flex space-x-1 mx-2.5 my-1">
                        {renderStars()}
                        <h3 className="text-sm font-medium">{"(3 reviews)"}</h3>
                      </div>
                      <h2 className="text-[11px] mx-2.5 font-medium xl:text-sm">
                        80% of costumers are satisfied
                      </h2>
                    </div>
                    <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                      <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                        <div className="w-full flex items-center my-1 xl:my-2">
                          <button className="flex gap-4 w-full items-center">
                            <UserIcon className="size-8" />
                            <p className="text-xl">User</p>
                          </button>
                          <div className="flex flex-row justify-end items-end w-full mx-2">
                            {renderStars()}
                          </div>
                        </div>
                        <h1 className="font-normal text-base">
                          {loremPlaceholder}
                        </h1>
                      </div>
                    </div>
                    <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                      <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                        <div className="w-full flex items-center my-1 xl:my-2">
                          <button className="flex gap-4 w-full items-center">
                            <UserIcon className="size-8" />
                            <p className="text-xl">User</p>
                          </button>
                          <div className="flex flex-row justify-end items-end w-full mx-2">
                            {renderStars()}
                          </div>
                        </div>
                        <h1 className="font-normal text-base">
                          {loremPlaceholder}
                        </h1>
                      </div>
                    </div>
                    <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                      <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                        <div className="w-full flex items-center my-1 xl:my-2">
                          <button className="flex gap-4 w-full items-center">
                            <UserIcon className="size-8" />
                            <p className="text-xl">User</p>
                          </button>
                          <div className="flex flex-row justify-end items-end w-full mx-2">
                            {renderStars()}
                          </div>
                        </div>
                        <h1 className="font-normal text-base">
                          {loremPlaceholder}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-bottom flex flex-[1] flex-col md:flex-row xl:ml-4 xl:mr-4 2xl:hidden">
              <div className="product-info flex-wrap flex-[3] flex flex-col items-start justify-start bg-gray-100 rounded-lg my-2 sm:mx-4 sm:p-1 sm:pt-3 md:ml-3 md:mr-1  ">
                <h1 className="mx-4 mt-1.5 text-2xl sm:text-2xl xl:text-3xl">
                  Product Information
                </h1>
                <p className="text-xs font-normal mx-4 xl:text-sm xl:ml-[18px]">
                  Product Details
                </p>
                <div className="flex flex-row space-x-2 m-2 w-full justify-between gap-7 md:gap-3 md:mt-6 ">
                  <h2 className="mx-2.5 text-center text-xs flex justify-center items-center sm:text-sm ">
                    Category
                  </h2>
                  <div className="flex gap-3 flex-1">
                    {/* should be array here */}
                    <p className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center sm:text-sm">
                      Bags
                    </p>
                    <p className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center sm:text-sm">
                      Accessories
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 m-5 justify-between gap-10 md:gap-7">
                  <h3 className="text-xs text-center flex justify-center items-center sm:text-sm">
                    Quantity
                  </h3>
                  <div className="flex gap-2 flex-1">
                    <button
                      onClick={handleMinus}
                      className="flex px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 sm:text-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-20 text-xs text-center border-2 border-black rounded-full bg-gray sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={count}
                    />
                    <button
                      onClick={handlePlus}
                      className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 sm:text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-reviews flex-[5] items-start justify-start bg-gray-100 rounded-lg my-2 sm:mx-4 sm:p-2">
                <div className="flex flex-[1] flex-col mb-3">
                  <h1 className="mx-2.5 mt-1.5 text-2xl xl:text-3xl">
                    Customer Reviews
                  </h1>
                  <div className="flex space-x-1 mx-2.5 my-1">
                    {renderStars()}
                    <h3 className="text-xs font-medium xl:text-sm">
                      {"(3 reviews)"}
                    </h3>
                  </div>
                  <h2 className="text-[11px] mx-2.5 font-medium xl:text-sm">
                    80% of costumers are satisfied
                  </h2>
                </div>
                <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                  <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                    <div className="w-full flex items-center my-1 xl:my-2">
                      <button className="flex gap-2 w-full">
                        <UserIcon className="size-5 xl:size-7" />
                        <p className="text-base xl:text-lg">User</p>
                      </button>
                      <div className="flex flex-row justify-end items-end w-full mx-2">
                        {renderStars()}
                      </div>
                    </div>
                    <h1 className="font-normal text-sm">{loremPlaceholder}</h1>
                  </div>
                </div>
                <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                  <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                    <div className="w-full flex items-center my-1 xl:my-2">
                      <button className="flex gap-2 w-full">
                        <UserIcon className="size-5 xl:size-7" />
                        <p className="text-base xl:text-lg">User</p>
                      </button>
                      <div className="flex flex-row justify-end items-end w-full mx-2">
                        {renderStars()}
                      </div>
                    </div>
                    <h1 className="font-normal text-sm">{loremPlaceholder}</h1>
                  </div>
                </div>
                <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                  <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                    <div className="w-full flex items-center my-1 xl:my-2">
                      <button className="flex gap-2 w-full">
                        <UserIcon className="size-5 xl:size-7" />
                        <p className="text-base xl:text-lg">User</p>
                      </button>
                      <div className="flex flex-row justify-end items-end w-full mx-2">
                        {renderStars()}
                      </div>
                    </div>
                    <h1 className="font-normal text-sm">{loremPlaceholder}</h1>
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

export default ProductPage;
