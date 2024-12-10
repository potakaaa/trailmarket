import { useState } from "react";
import ChevronDown from "../../../public/assets/Chevron.svg";
import LogOut from "../../../public/assets/LogOut.svg";
import Person from "../../../public/assets/Person.svg";
import ShoppingCart from "../../../public/assets/ShoppingCart.svg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ChangeEvent } from "react";

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

const AdminNavBar: React.FC<NavBarProps> = ({ obj }) => {
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
      <button className="NavBarLeft" onClick={() => nav("/admin")}>
        <h1 className="NavBarTitle text-transparent bg-gradient-to-r from-[#282667] to-slate-900 bg-clip-text flex flex-col align-center justify-center md:row-span-2 sm:col-span-3 sm:text-center text-center mb-2 text-2xl sm:text-3xl md:text-4xl md:my-2 lg:my-3 xl:pl-[20px]">
          TrailMarket Admin
        </h1>
      </button>
    </div>
  );
};

export default AdminNavBar;
