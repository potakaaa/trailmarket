import { useState } from "react";
import ChevronDown from "../assets/ChevronDown.svg";
import LogOut from "../assets/LogOut.svg";
import Person from "../assets/Person.svg";
import Search from "../assets/Search.svg";
import ShoppingCart from "../assets/ShoppingCart.svg";

interface Categories {
  CategoryName: string,
  CategoryDesc: string,
  CategoryStartPrice: number,
  CategoryImage: string
}

interface NavBarProps {
  obj: Categories[];
}

const NavBar: React.FC<NavBarProps> = ({ obj }) => {
  const [selectedValue, setSelectedValue] = useState<string>(obj[0].CategoryName || '');

  // Handle change event when a user selects a different option
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  }

  return (
    <div className="NavBar h-[4rem] flex">
        <p className="NavBarTitle ">TrailMarket</p>
        <div className="NavBarMiddle">
          <div className="NavBarSearch">
            <div className="NavBarCategories">
              <select id="my-select" value={selectedValue} onChange={handleChange} className="">
                {obj.map((category, index) => (
                  <option key={index} value={category.CategoryName}>{category.CategoryName}</option>
                ))} 
              </select>
            </div>
            <div className="NavBarSearchBar">
              <input type="text" placeholder="Search in the market"/>
            </div>
          </div>
          <div className="NavBarSeller">
            <button>NavBarSeller</button>
          </div>
        </div>
    </div>
  )
}

export default NavBar;
