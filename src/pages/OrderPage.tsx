const OrderPage = () => {
    const orderItems = [
        {
            orderId: 1,
            cartItems: [
                {
                    cartItemId: 1,
                    cartItemImage: "https://www.kalkstore.com/cdn/shop/articles/KL_WEB_BLOG_PORTADA_4420x2400_df689793-0c08-4d64-8872-7b415597a5ac.jpg?v=1654701916&width=700",
                    buyerName: "userAlpha4",
                    productName: "Big K Sling Chainbag",
                    totalPrice: 400,
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
                    totalPrice: 40000,
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
                    totalPrice: 200,
                    quantity: 1,
                    deliveryLocation: "Study Shed 2",
                    deliveryMethodOptions: "Pickup",
                    deliveryDate: "2022-12-31",
                    deliveryTime: "15:00",
                    shippingFee: 0
                }
            ]    
        },
    ];

    return (
        <div>
            <div className="CartHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 mx-5 rounded-2xl text-white text-center">
                <h1 className="text-2xl">
                    Order
                </h1>
            </div>
            <div className="OrderItemList shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col items-stretch rounded-xl px-5 m-5 h-full">
            {orderItems.map((item) => (
                (<div
                key={item.orderId}
                className={"orderItem flex-1 flex-col p-5"}
                >
                <div className="orderItemTop flex flex-col justify-between">
                    <p className="text-2xl py-4">Order {item.orderId}</p>
                    <div>

                    </div>
                    {item.cartItems.map((cartItem) => (
                        <div className="flex flex-row my-5">
                            <img
                                src={cartItem.cartItemImage}
                                alt="Product"
                                className="orderItemImage w-20 h-20 object-cover rounded-lg" 
                            />
                            <div className="flex flex-row items-center justify-between w-full ml-5">
                                <div className="OrderItemInformation">
                                    <p className="OrderItemName text-sm md:text-base xl:text-xl">{cartItem.productName}</p>
                                    <p className="orderItemQuantity text-sm md:text-base xl:text-lg text-gray-700 font-medium">
                                        Quantity: {cartItem.quantity}
                                    </p>
                                </div>
                                <div className="orderItemDetails">
                                    <p className="orderItemPrice text-xs sm:text-sm md:text-base xl:text-lg text-right">
                                        Price: {cartItem.totalPrice}
                                    </p>
                                    <p className="orderItemShipping text-xs sm:text-sm md:text-base xl:text-lg text-right text-gray-700 font-medium">
                                        Shipping Fee: {cartItem.shippingFee}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>)
            ))}
        </div>
    </div>
    );
};

export default OrderPage;