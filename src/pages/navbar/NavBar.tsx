import { useState } from "react";
import ChevronDown from "../assets/ChevronDown.svg";
import LogOut from "../assets/LogOut.svg";
import Person from "../assets/Person.svg";
import ShoppingCart from "../assets/ShoppingCart.svg";

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
    <div className="NavBar grid md:grid-cols-[25%_50%_25%] p-4 w-full md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-[auto_1fr]">
      <p className="NavBarTitle text-transparent bg-gradient-to-r from-[#282667] to-slate-900 bg-clip-text text-3xl text-left flex flex-col align-center justify-center md:col-span-1 sm:col-span-3 sm:text-center">
        TrailMarket
      </p>

      <div className="NavBarMiddle flex items-center justify-center sm:col-span-1">
        <div className="NavBarSearch flex items-center border-2 border-black rounded-full p-2 mr-4">
          <div className="NavBarCategories flex items-center border-r-2 pl-6 pr-6 pt-2 pb-2">
            <button
              className="flex items-center"
              onClick={toggleCategoryDropdown}
            >
              <img src={ChevronDown} alt="Dropdown" />
              <p className="font-medium">{selectedCategory}</p>
            </button>
            {dropdownCategoryOpen && (
              <div className="absolute top-20 right-50 bg-white rounded-md">
                {obj.map((category, index) => (
                  <button
                    key={index}
                    className="flex items-center p-2 hover:bg-gray-100 w-full text-[1rem]"
                    onClick={() => handleCategoryClick(category.CategoryName)}
                  >
                    <p>{category.CategoryName}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="NavBarSearchBar flex-grow">
            <input
              type="text"
              placeholder="Search in the market"
              className="bg-transparent border-none focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="NavBarSeller border-2 border-black rounded-full p-4">
          <button>Seller Page</button>
        </div>
      </div>

      <div className="NavBarRight hidden md:flex justify-end items-center">
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

      <div className="md:hidden relative">
        <button
          onClick={toggleRightIconsDropdown}
          className="flex items-center p-2"
        >
          <img src={ChevronDown} alt="Dropdown" className="w-full h-full" />
        </button>

        {dropdownRightIconsOpen && (
          <div className="absolute top-12 right-0 bg-white border shadow-lg rounded-md w-[200px]">
            {RightIcons.map((icons, index) => (
              <button
                key={index}
                value={icons.IconName}
                className="flex items-center p-2 hover:bg-gray-100 w-full text-[1rem]"
              >
                <img src={icons.Icon} alt={icons.IconName} />
                <p className="font-[2rem]">{icons.IconName}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
