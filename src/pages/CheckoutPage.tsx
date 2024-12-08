import TopNavbar from "./navbar/TopNavBar";
import NavBar from "./navbar/NavBar";
import { useState } from "react";

interface CartItem {
    cartItemId: string;
    cartItemImage: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    deliveryLocation: string;
    deliveryMethodOptions: string;
    deliveryTime: string;
}

interface CheckoutPageProps {
    cartItems: CartItem[];
}

const CheckoutPage = ({ cartItems }: CheckoutPageProps) => {
    const payment = {
        paymentTransactionId: "NX93842",
        paymentTotal: 0
    }

    const deliveryLocationOptions = ["CITC", "CEA", "Study Shed 2", "Study Shed 1", "CSM", "Gym Lobby", "Old CSM"];
    const deliveryMethodOptions = ["Pickup", "Delivery"];

    const [cartItemsState, setCartItemsState] = useState(cartItems);

    return (
    <div>
        <TopNavbar />
        <NavBar obj={[]} />
        <div className="OrderHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 mx-5 rounded-2xl 2xl:mx-8 text-white text-center">
            <p>Checkout</p>
        </div>
        <div className="OrderBody flex flex-col lg:flex-row h-full m-5  min-h-screen">
            <div className="OrderItemList shadow-xl shadow-[0px_0px_20px_10px_rgba(0,0,0,0.3)] flex flex-col items-stretch lg:w-2/3 sm:w-full h-full rounded-xl px-4">
                { cartItemsState.map((item) => (
                    <div key={item.cartItemId} className="CartItem flex-1 h-full flex py-4 xl:max-h-[300px] border-b-2 border-gray-400">
                        <div className="CartItemTop w-[30%] overflow-hidden rounded-xl">
                            <img src={item.cartItemImage} alt={item.productName} className="Image w-full h-full object-cover"/>
                        </div>
                        <div className="CartItemInfo m-6 flex gap-2 flex-col w-[70%]">
                            <div className="CartItemMiddle pb-[15px]">
                                <h1 className="text-2xl">{item.productName}</h1>
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
                            <div className="CartItemButtom flex items-end lg:justify-between md:justify-start gap-2 flex-wrap max-w-[500px]">
                                <div className="CartItemProductLocation lg:w-1/3 md:w-1/2">
                                    <p className="text-sm font-medium">Delivery Location</p>
                                    <select 
                                        value={item.deliveryLocation}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCartItemsState(cartItemsState.map(cartItem => cartItem.cartItemId === item.cartItemId ? { ...cartItem, deliveryLocation: value } : cartItem));
                                        }}
                                        className="w-full border-[2px] border-black rounded-2xl px-4"
                                    >
                                        {
                                            deliveryLocationOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="CartItemDeliveryMethod lg:w-1/4 md:w-1/3">
                                    <p className="text-sm font-medium">Delivery Method</p>
                                    <select 
                                        value={item.deliveryMethodOptions}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCartItemsState(cartItemsState.map(cartItem => cartItem.cartItemId === item.cartItemId ? { ...cartItem, deliveryMethodOptions: value } : cartItem));
                                        }}
                                        className="w-full border-[2px] border-black rounded-2xl px-4"
                                    >
                                        {
                                            deliveryMethodOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="CartItemDeliveryTime lg:w-1/3 md:w-2/4">
                                    <p className="text-sm font-medium">Delivery Time</p>
                                    <input 
                                        type="time" 
                                        value={item.deliveryTime}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCartItemsState(cartItemsState.map(cartItem => cartItem.cartItemId === item.cartItemId ? { ...cartItem, deliveryTime: value } : cartItem));
                                        }}
                                        className="w-full border-[2px] border-black rounded-2xl px-4 sm:w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default CheckoutPage;