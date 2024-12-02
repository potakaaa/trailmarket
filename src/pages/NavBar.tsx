import { useState } from "react";
import ChevronDown from "../assets/ChevronDown.svg";
import LogOut from "../assets/LogOut.svg";
import Person from "../assets/Person.svg";
import Search from "../assets/Search.svg";
import ShoppingCart from "../assets/ShoppingCart.svg";

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className="NavBar
    flex flex-row 
    justify-between items-center
    "
    >
      <div
        className="NavBarLeft
      flex flex-row 
      justify-between items-center
      m-4 mr-0 w-full flex-1
      "
      >
        <h1
          className="
        bg-gradient-to-r
        from-[#6B66FB] to-[#000000]
        text-transparent bg-clip-text
        "
        >
          TrailMarket
        </h1>
      </div>
      <div
        className="NavBarMiddle
      flex flex-row 
      justify-between items-center
      m-4 w-full flex-1
      "
      >
        <div
          className="NavBarSearch
        flex flex-row 
        justify-between items-center
        border-black border
        pl-3 pr-3 mr-5
        rounded-full
        min-w-[200px]
        "
        >
          <div
            className="NavBarSearchCategories
            flex flex-row 
            justify-between items-center

          "
          >
            <p
              className="
            hidden sm:flex
            text-[10px]
            "
            >
              ALL CATEGORIES
            </p>
            <img src={ChevronDown} alt="ChevronDown" className="w-5 h-5" />
          </div>
          <div className="NavBarSearchTextbox">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search in the market"
              className="
               h-3 w-full
              rounded-full p-4 text-[10px]"
            />
          </div>
          <div className="NavBarSearchIcon">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
        </div>
        <div
          className="NavBarSellerButton
        border border-black
        w-16 h-8 items-center justify-center
        rounded-full hidden sm:flex
          "
        >
          <p
            className="
          text-sm text-center
          "
          >
            Seller
          </p>
        </div>
      </div>
      <div
        className="NavBarRight
      flex flex-row 
      justify-between items-center
      mr-10 w-full text-[15px]
      flex-1
      "
      >
        <button
          className="flex items-center 
          space-x-2 sm:hidden" // Hides on screens larger than sm
          onClick={toggleDropdown}
        >
          <img src={ChevronDown} alt="Dropdown" className="w-5 h-5" />
          <p className="font-medium">More</p>
        </button>

        {dropdownOpen && (
          <div
            className="absolute top-12 right-50
          bg-white border shadow-lg 
          rounded-md sm:hidden"
          >
            <button
              className="flex items-center 
            space-x-2 p-2 hover:bg-gray-100
            w-full text-[10px]"
            >
              <img src={ShoppingCart} alt="ShoppingCart" className="w-6 h-6" />
              <p className="font-[500]">Shopping Cart</p>
            </button>
            <button
              className="flex items-center 
            space-x-2 p-2 hover:bg-gray-100
            w-full text-[10px]"
            >
              <img src={Person} alt="Person" className="w-6 h-6" />
              <p className="font-[500]">Profile</p>
            </button>
            <button
              className="flex items-center 
            space-x-2 p-2 hover:bg-gray-100
            w-full text-[10px]"
            >
              <img src={LogOut} alt="LogOut" className="w-6 h-6" />
              <p className="font-[500]">Log Out</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
