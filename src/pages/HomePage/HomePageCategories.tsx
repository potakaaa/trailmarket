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
    <button className="m-4" onClick={() => handleClick && handleClick(name)}>
      <div className="CategoriesComponent flex h-[200px] md:h-[200px] lg:h-[250px]">
        {" "}
        {/* Set fixed height */}
        <div className="CategoriesComponentLeft flex-1 p-5 rounded-tl-2xl rounded-bl-2xl bg-[#252525] text-white flex flex-col justify-between gap-10 shadow-lg">
          <div className="LeftTopText">
            <h1 className="ComponentName text-xl sm:text-2xl">{name}</h1>
            <p className="ComponentDesc text-[10px] sm:text-xs font-medium">
              {desc}
            </p>
          </div>
          <div className="LeftButtomText text-right">
            <p className="text-xs font-medium text-right">Starts at</p>
            <h1 className="text-2xl">PHP {price}</h1>
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
