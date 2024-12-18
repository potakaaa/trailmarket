import { useEffect, useRef, useState } from "react";
import ChevronDown from "../../../public/assets/Chevron.svg";
import LogOut from "../../../public/assets/LogOut.svg";
import Person from "../../../public/assets/Person.svg";
import ShoppingCart from "../../../public/assets/ShoppingCart.svg";
import PurchaseHistory from "../../../public/assets/Order.svg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ChangeEvent } from "react";
import add_post from "../../../public/assets/add_post.svg";

const RightIcons = [
  { Icon: LogOut, IconName: "Log Out" },
  { Icon: Person, IconName: "Person" },
  { Icon: ShoppingCart, IconName: "Shopping Cart" },
  { Icon: PurchaseHistory, IconName: "Purchase History" },
  { Icon: add_post, IconName: "Post Product" },
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
    () => nav("/post"),
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

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownRightIconsOpen(false);
      setDropdownCategoryOpen(false);
    }
  };

  // Add and clean up event listener for clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="NavBar mb-5 flex flex-col xl:flex-row 2xl:flex-row justify-center items-center lg:px-10 md:px-5 px-5 xl:px-10 w-full">
      <button className="NavBarLeft" onClick={() => nav("/home")}>
        <h1 className="NavBarTitle text-transparent bg-gradient-to-r from-[#282667] to-slate-900 bg-clip-text flex flex-col align-center justify-center md:row-span-2 sm:col-span-3 text-center mb-2 text-2xl sm:text-3xl md:text-4xl md:my-5 sm:my-4 xl:pr-10">
          TrailMarket
        </h1>
      </button>

      <div className="NavBarMiddleRight flex flex-grow justify-center w-full">
        <div className="NavBarMiddle flex items-center justify-center gap-2 w-full">
          <div className="NavBarSearchBar flex border-2 border-black rounded-full h-9 sm:h-12 md:h-14 px-5 w-full">
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
        </div>
        <div className="NavBarRight flex justify-center">
          <div
            className="NavBarRightIcons hidden md:flex
        justify-end items-center gap-2 ml-5"
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
          <div className="dropdown flex md:hidden relative" ref={dropdownRef}>
            <button
              onClick={toggleRightIconsDropdown}
              className="flex items-center pl-2"
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
                    <img src={icons.Icon} alt={icons.IconName} />
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
