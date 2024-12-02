import "./NavBar.css"

function NavBar() {
    return (
        <div className="NavBar">
            <ul className="NavBarTop">
                <li className="NavBarTopItem">Name</li>
                <li className="NavBarTopItem">Picture</li>
            </ul>
            <ul className="NavBarBottom">

                <li>Wishlist</li>
                <li>Post a Product</li>
                <li>My Account</li>
                <li><button className="SellerPageButton" >Seller Page</button></li>

                <li>
                    <input
                        type="text"
                        placeholder="Search in the market"
                    />
                    <button>Search Button</button>

                </li>
            </ul>
        </div>
    )
}

export default NavBar;