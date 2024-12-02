import "./NavBar.css"
import ChevronDown from '../assets/ChevronDown.svg';
import LogOut from '../assets/LogOut.svg';
import Person from '../assets/Person.svg';
import Search from '../assets/Search.svg';
import ShoppingCart from '../assets/ShoppingCart.svg';

function NavBar() {
    return (
        <div className="NavBar">
            <div className="NavBarLeft">
                <p>TrailMarket</p>
            </div>
            <div className="NavBarMiddle">
                <div className="NavBarSearch">
                    <div className="NavBarSearchCategories">
                        <p>CATEGORIES</p>
                        <img src={ChevronDown}alt="ChevronDown" />
                    </div>
                    <div className="NavBarSearchTextbox"> 
                        <input type="text" name="" id="" placeholder="Search in the market"/>
                    </div>
                    <div className="NavBarSearchIcon">
                        <img src={Search} alt="Search" />
                    </div>
                </div>
                <div className="NavBarSellerButton">
                    <p>Seller Page</p>
                </div>
            </div>
            <div className="NavBarRight">
                <div className="NavBarRightIcons">
                    <img src={ShoppingCart} alt="ShoppingCart" />
                </div> 
                <div className="NavBarRightIcons">
                    <img src={Person} alt="Person" />
                </div>
                <div className="NavBarRightIcons">
                    <img src={LogOut} alt="LogOut" />
                </div>
            </div>
        </div>
    )
}

export default NavBar;