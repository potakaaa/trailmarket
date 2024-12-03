import { useState } from "react";
import ChevronDown from "../../assets/Chevron.svg";
import LogOut from "../../assets/LogOut.svg";
import Person from "../../assets/Person.svg";
import ShoppingCart from "../../assets/ShoppingCart.svg";

const RightIcons = [
  { Icon: LogOut, IconName: "Log Out" },
  { Icon: Person, IconName: "Person" },
  { Icon: ShoppingCart, IconName: "Shopping Cart" },
];

interface Categories {
  CategoryName: string;
  CategoryDesc: string;
  CategoryStartPrice: number;
  CategoryImage: string;
}

interface NavBarProps {
  obj: Categories[];
}

const NavBar: React.FC<NavBarProps> = ({ obj }) => {
  const [dropdownCategoryOpen, setDropdownCategoryOpen] = useState(false);
  const [dropdownRightIconsOpen, setDropdownRightIconsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const toggleCategoryDropdown = () => {
    setDropdownCategoryOpen((prev) => !prev);
  };

  const toggleRightIconsDropdown = () => {
    setDropdownRightIconsOpen((prev) => !prev);
  };

  const handleCategoryClick = (CategoryName: string) => {
    setSelectedCategory(CategoryName);
    setDropdownCategoryOpen(false);
  };

  return (
    <div
      className="NavBar flex flex-col h-23
      md:grid-cols-[25%_50%_25%] 
    p-1.5 w-full md:grid-rows-1 
    sm:grid-cols-1 sm:grid-rows-[auto_1fr]
    "
    >
      <div className="NavBarLeft">
        <p
          className="NavBarTitle text-transparent
        bg-gradient-to-r from-[#282667]
         to-slate-900 bg-clip-text text-2xl 
         flex flex-col align-center
          justify-center md:col-span-1
          sm:col-span-3 sm:text-center
           text-center
          "
        >
          TrailMarket
        </p>
      </div>

      <div
        className="NavBarMiddleRight flex h-10
      justify-between gap-5 mx-3 my-1"
      >
        <div
          className="NavBarMiddle flex 
        justify-center gap-2 "
        >
          <div
            className="NavBarSearch flex items-center
          border border-black rounded-full p-3
          h-10
          "
          >
            <div
              className="NavBarCategories flex items-center
             border-r-2 pr-1"
            >
              <button
                className="flex items-center"
                onClick={toggleCategoryDropdown}
              >
                <img
                  src={ChevronDown}
                  alt="Dropdown"
                  className="
                min-w-5
                "
                />
                <p
                  className="font-medium
                hidden
                "
                >
                  {selectedCategory}
                </p>
              </button>
              {dropdownCategoryOpen && (
                <div
                  className="absolute 
                bg-white rounded-md
                "
                >
                  {obj.map((category, index) => (
                    <button
                      key={index}
                      className="flex items-center p-2
                      hover:bg-gray-100 w-full text-[1rem]"
                      onClick={() => handleCategoryClick(category.CategoryName)}
                    >
                      <p>{category.CategoryName}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              className="NavBarSearchBar flex
            w-full
            "
            >
              <input
                type="text"
                placeholder="Search in the market"
                className="bg-transparent border-none
                focus:outline-none  pl-4 p-3
                text-sm font-medium
                "
              />
            </div>
          </div>
          <div
            className="NavBarSeller border border-black
          rounded-full flex justify-center items-center text-[10px]
          font-semibold w-20 
          "
          >
            <button>My Products</button>
          </div>
        </div>
        <div
          className="NavBarRight hidden md:flex
        justify-end items-center "
        >
          {RightIcons.map((icons, index) => (
            <button
              key={index}
              value={icons.IconName}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <img
                src={icons.Icon}
                alt={icons.IconName}
                className="min-w-[2rem]"
              />
            </button>
          ))}
        </div>
        <div className="dropdown flex md:hidden relative">
          <button
            onClick={toggleRightIconsDropdown}
            className="flex items-center p-2"
          >
            <img
              src={ChevronDown}
              alt="Dropdown"
              className="w-full h-full min-w-5 flex"
            />
          </button>
          {dropdownRightIconsOpen && (
            <div
              className="absolute top-12 right-0 bg-white
             border shadow-lg rounded-md w-[200px]"
            >
              {RightIcons.map((icons, index) => (
                <button
                  key={index}
                  value={icons.IconName}
                  className="flex items-center p-2
                   hover:bg-gray-100 w-full text-[1rem]"
                >
                  <img src={icons.Icon} alt={icons.IconName} />
                  <p className="font-[2rem]">{icons.IconName}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
