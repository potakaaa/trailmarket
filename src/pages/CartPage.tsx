import TopNavbar from "./navbar/TopNavBar";
import NavBar from "./navbar/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const nav = useNavigate();
    const cartItems = [
        {
            cartItemId: 1,
            cartItemImage: "https://www.kalkstore.com/cdn/shop/articles/KL_WEB_BLOG_PORTADA_4420x2400_df689793-0c08-4d64-8872-7b415597a5ac.jpg?v=1654701916&width=700",
            buyerName: "userAlpha4",
            productName: "Big K Sling Chainbag",
            unitPrice: 100,
            quantity: 4,
            deliveryLocation: "CITC",
            deliveryMethodOptions: "Pickup",
            deliveryDate: "2022-12-31",
            deliveryTime: "10:00",
            shippingFee: 0
        },
        {
            cartItemId: 2,
            cartItemImage: "https://media.karousell.com/media/photos/products/2024/9/9/macbook_air_2018_13inch_core_i_1725901665_e2991c14_progressive.jpg",
            buyerName: "grandnationalExperimental",
            productName: "Apple MacBook M1",
            unitPrice: 40000,
            quantity: 1,
            deliveryLocation: "CEA",
            deliveryMethodOptions: "Delivery",
            deliveryDate: "2022-12-31",
            deliveryTime: "11:00",
            shippingFee: 50
        },
        {
            cartItemId: 3,
            cartItemImage: "https://img.ltwebstatic.com/images3_spmp/2023/05/19/1684480567b4c168018d222c224b27ece30b2d14f8_thumbnail_720x.jpg",
            buyerName: "userAlpha4",
            productName: "Some Colorful Notebooks",
            unitPrice: 200,
            quantity: 1,
            deliveryLocation: "Study Shed 2",
            deliveryMethodOptions: "Pickup",
            deliveryDate: "2022-12-31",
            deliveryTime: "15:00",
            shippingFee: 0
        }
    ];

    const payment = {
        paymentTransactionId: "NX93842",
        paymentTotal: 0
    }

    const [cartItemsState, setCartItemsState] = useState(cartItems);

    return (
        <div className="mb-5">
            <TopNavbar />
            <NavBar obj={[]} />
            <div className="CartHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 mx-5 rounded-2xl 2xl:mx-8 text-white text-center">
                <p>Shopping Cart</p>
            </div>
            <div className="CartBody flex flex-col lg:flex-row h-full m-5  min-h-screen">
                <div className="CartItemList flex flex-col items-stretch lg:w-2/3 sm:w-full gap-5 h-full">
                    {
                        cartItemsState.map((item) => (
                            <div key={item.cartItemId} className="CartItem shadow-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] flex-1 h-full flex rounded-xl xl:max-h-[300px]">
                                <div className="CartItemImage w-[30%] overflow-hidden rounded-xl">
                                    <img src={item.cartItemImage} alt={item.productName} className="Image w-full h-full object-cover"/>
                                </div>
                                <div className="CartItemInfo m-6 flex gap-2 flex-col w-[70%]">
                                    <div className="CartItemTop">
                                        <div className="CartItemSeller flex items-center">
                                            <div className="CartItemSellerImage bg-gray-700 w-3 h-3 mr-2 rounded-full"></div>
                                            <p className="CartItemSellerName text-xs font-medium">
                                                {item.buyerName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="CartItemMiddle">
                                        <h1 className="text-2xl border-b-2 border-gray-400 pb-4">{item.productName}</h1>
                                        <div className="CartItemsPriceConfig flex pt-[15px] justify-between">
                                            <div className="CartItemsUnitPrice w-1/3">
                                                <p className="text-sm font-medium">Unit Price</p>
                                                <h1 className="text-2xl">{item.unitPrice}</h1>
                                            </div>
                                            <div className="CartItemsQuantity w-1/3">
                                                <p className="text-sm font-medium">Quantity</p>
                                                <div className="CartItemsQuantityEdit">
                                                    <input 
                                                        type="number" 
                                                        value={item.quantity} 
                                                        min="1"
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            if (value > 0) {
                                                                setCartItemsState(cartItemsState.map(cartItem => cartItem.cartItemId === item.cartItemId ? { ...cartItem, quantity: value } : cartItem));
                                                            }
                                                        }} 
                                                        className="w-1/2 border-[2px] border-black rounded-2xl px-4 text-center"
                                                        onKeyDown={(e) => e.preventDefault()}
                                                    />
                                                </div>
                                            </div>
                                            <div className="CartItemsTotalPrice w-1/3">
                                                <p className="text-sm font-medium">Total Price</p>
                                                <h1 className="text-2xl">{item.unitPrice * item.quantity}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="CartPayment lg:w-1/3 sm:w-full">
                    <div className="CartPaymentWindow flex flex-col items-center shadow-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] flex m-5 rounded-xl p-8">
                        <div className="CartPaymentInfo w-full">
                            <h1 className="text-2xl pb-4">Payment Summary</h1>
                            <div className="PaymentTransactionId">
                                <p className="text-sm font-medium">Transaction ID</p>
                                <h1 className="pb-6 mb-6 text-2xl border-b-2 border-gray-400">{payment.paymentTransactionId}</h1>
                            </div>
                            <div className="PaymentOrderSummary">
                                <p className="text-sm font-medium">Order Summary</p>
                                <h1 className="pb-4 text-2xl">
                                    {cartItemsState.reduce((total, item) => total + (item.unitPrice * item.quantity), 0)}
                                </h1>
                            </div>
                            <div className="PaymentShippingFee">
                                <p className="text-sm font-medium">Shipping Fee</p>
                                <h1 className="pb-4 text-2xl">
                                    {cartItemsState.reduce((total, item) => total + item.shippingFee, 0)}
                                </h1>
                            </div>
                            <div className="PaymentTotal bg-gradient-to-r from-[#282667] to-slate-900 p-2 rounded-2xl text-white w-full flex flex-col align-center p-4 mb-4">
                                <p className="text-sm font-normal">Total Amount</p>
                                <h1 className="text-2xl font-semibold">
                                    {cartItemsState.reduce((total, item) => total + (item.unitPrice * item.quantity) + item.shippingFee, 0)}
                                </h1>
                            </div>
                        </div>
                        <div className="PaymentButton w-full">
                        <button className="bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 rounded-2xl text-white text-center w-full" onClick={() => nav("/checkout", { state: { cartItems }})}>
                            Proceed to Payment
                        </button>
                    </div>
                    </div>
                </div>   
            </div>
        </div>
    );
}

export default CartPage;