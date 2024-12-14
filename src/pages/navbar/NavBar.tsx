import { useState } from "react";
import ChevronDown from "../../../public/assets/Chevron.svg";
import LogOut from "../../../public/assets/LogOut.svg";
import Person from "../../../public/assets/Person.svg";
import ShoppingCart from "../../../public/assets/ShoppingCart.svg";
import PurchaseHistory from "../../../public/assets/Order.svg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ChangeEvent } from "react";

const RightIcons = [
  { Icon: LogOut, IconName: "Log Out" },
  { Icon: Person, IconName: "Person" },
  { Icon: ShoppingCart, IconName: "Shopping Cart" },
  { Icon: PurchaseHistory, IconName: "Purchase History" },
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

  const { selectedCategory, setSelectedCategory, setSearchState } =
    useAuthContext();

  const { setIsLoggedIn, setUser } = useAuthContext();

  const navArr = [
    () => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      nav("/login");
    },
    () => nav("/myprofile"),
    () => nav("/cart"),
    () => nav("/purchasehistory"),
  ];

  const handleSearch = (value: string) => {
    setSearchState(value);
  };

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

  const nav = useNavigate();

  return (
    <div className="NavBar mb-3 flex flex-col xl:flex-row 2xl:flex-row justify-center items-center  lg:px-5 2xl:px-10 w-full">
      <button className="NavBarLeft" onClick={() => nav("/home")}>
        <h1 className="NavBarTitle text-transparent bg-gradient-to-r from-[#282667] to-slate-900 bg-clip-text flex flex-col align-center justify-center md:row-span-2 sm:col-span-3 sm:text-center text-center mb-2 text-2xl sm:text-3xl md:text-4xl md:my-2 lg:my-3 xl:pl-[20px]">
          TrailMarket
        </h1>
      </button>

      <div className="NavBarMiddleRight flex flex-grow justify-center items mx-5 w-full">
        <div className="NavBarMiddle flex items-center justify-center gap-2 w-full ml-5">
          <div className="NavBarSearchBar flex border border-black rounded-full h-9 sm:h-12 md:h-14 px-5 w-full">
            <div className="NavBarCategories flex relative w-5 sm:w-48 md:w-56 lg:w-72 justify-start">
              <button
                className="flex items-center"
                onClick={toggleCategoryDropdown}
              >
                <p className="font-medium hidden sm:block text-sm mr-1 lg:text-lg md:p-1 lg:p-4">
                  {selectedCategory}
                </p>
                <img
                  src={ChevronDown}
                  alt="Dropdown"
                  className="
                    min-w-5
                    "
                />
              </button>
              {dropdownCategoryOpen && (
                <div className="absolute top-full left-0 sm:left-14 bg-slate-50 shadow-md rounded-md w-20 sm:w-28 md:w-36 z-20">
                  {obj.map((category, index) => {
                    if (selectedCategory === category.CategoryName) {
                      return null;
                    } else {
                      return (
                        <button
                          key={index}
                          className="flex items-center p-2 hover:bg-gray-100 w-full"
                          onClick={() =>
                            handleCategoryClick(category.CategoryName)
                          }
                        >
                          <p className="text-[12px] font-medium text-center flex-grow sm:text-sm md:text-base lg:text-lg">
                            {category.CategoryName}
                          </p>
                        </button>
                      );
                    }
                  })}
                </div>
              )}
            </div>
            <div className="NavBarSearch flex w-full">
              <input
                type="text"
                placeholder="Search in the market"
                className="bg-transparent border-none focus:outline-none pl-4 p-3 text-xs font-medium w-full sm:text-sm md:text-lg md:pl-6"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
              />
            </div>
          </div>
          <div
            className="NavBarSeller sm:border border-black
            rounded-full flex justify-center items-center text-[10px]
            font-semibold "
          >
            <button>
              <img
                src={Person}
                alt="Post Product"
                className="sm:hidden min-w-5"
              ></img>
            </button>
            <button
              className="hidden sm:block w-32 h-9 sm:h-12 text-sm font-medium rounded-full hover:bg-black hover:text-white hover:shadow-md md:text-base lg:w-40 lg:h-14 transition-all duration-300"
              onClick={() => nav("/post")}
            >
              Post Product
            </button>
          </div>
        </div>
        <div className="NavBarRight flex justify-end">
          <div
            className="NavBarRightIcons hidden md:flex
        justify-end items-center mr-5 ml-1"
          >
            {RightIcons.map((icons, index) => (
              <button
                key={index}
                value={icons.IconName}
                className="flex items-center p-2 hover:bg-gray-100 rounded-full"
                onClick={navArr[index]}
              >
                <img
                  src={icons.Icon}
                  alt={icons.IconName}
                  className="min-w-[2rem]"
                />
              </button>
            ))}
          </div>
          <div className="dropdown flex md:hidden relative mr-5">
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
                className="absolute top-full right-3 bg-white
             border shadow-lg rounded-md w-28 sm:w-32 items-center justify-center flex flex-col"
              >
                {RightIcons.map((icons, index) => (
                  <button
                    key={index}
                    value={icons.IconName}
                    className="flex items-center self-start p-2
                   hover:bg-gray-100 w-full font-light"
                    onClick={navArr[index]}
                  >
                    <img src={icons.Icon} alt={icons.IconName}/>
                    <p className="font-normal text-[12px] sm:text-sm items-center flex-grow">
                      {icons.IconName}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
