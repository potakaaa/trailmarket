import React from "react";

interface HomePageCategoriesProps {
  name: string;
  desc: string;
  price: number;
  image: string;
  handleClick?: (categoryName: string) => void;
}

const HomePageCategories: React.FC<HomePageCategoriesProps> = ({
  name,
  desc,
  price,
  image,
  handleClick,
}) => {
  return (
    <button
      className="mx-4 my-2 first:mt-4"
      onClick={() => handleClick && handleClick(name)}
    >
      <div className="CategoriesComponent group flex h-28 sm:h-36 md:h-[200px] lg:h-[250px] hover:h-36 sm:hover:h-40 md:hover:h-56 hover:shadow-lg transition-all duration-500">
        {" "}
        {/* Set fixed height */}
        <div className="CategoriesComponentLeft flex-1 p-5 rounded-tl-2xl rounded-bl-2xl bg-[#252525] text-white flex flex-row md:flex-col justify-between shadow-lg hover:shadow-xl">
          <div className="LeftTopText text-left">
            <h1 className="ComponentName text-lg sm:text-2xl group-hover:text-xl group-hover:sm:text-3xl transition-all duration-300">
              {name}
            </h1>
            <p className="ComponentDesc flex-wrap w-28 md:w-full text-[10px] sm:text-xs font-medium group-hover:text-xs group-hover:sm:text-sm transition-all duration-300 lg:text-sm">
              {desc}
            </p>
          </div>
          <div className="LeftButtomText text-right justify-center sm:justify-normal items-center md:items-end flex flex-col ">
            <p className="text-[10px] sm:text-sm font-medium text-right w-20 group-hover:text-xs group-hover:sm:text-base  transition-all duration-300">
              Starts at
            </p>
            <h1 className="text-lg sm:text-2xl text-right self-end group-hover:text-xl group-hover:sm:text-3xl transition-all duration-300">
              ₱ {price}
            </h1>
          </div>
        </div>
        <div className="CategoriesComponentRight flex-1 h-full">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full rounded-tr-2xl rounded-br-2xl"
          />
        </div>
      </div>
    </button>
  );
};

export default HomePageCategories;
