import { useState } from "react";

const CheckoutPage = () => {
  const orderItems = [
    {
      orderItemId: 1,
      orderItemImage:
        "https://www.kalkstore.com/cdn/shop/articles/KL_WEB_BLOG_PORTADA_4420x2400_df689793-0c08-4d64-8872-7b415597a5ac.jpg?v=1654701916&width=700",
      buyerName: "userAlpha4",
      productName: "Big K Sling Chainbag",
      unitPrice: 100,
      quantity: 4,
      deliveryLocation: "CITC",
      deliveryMethodOptions: "Pickup",
      deliveryDate: "2024-12-07",
      deliveryTime: "10:00",
      shippingFee: 0,
      paymentMethod: "Cash on Delivery",
    },
    {
      orderItemId: 2,
      orderItemImage:
        "https://media.karousell.com/media/photos/products/2024/9/9/macbook_air_2018_13inch_core_i_1725901665_e2991c14_progressive.jpg",
      buyerName: "grandnationalExperimental",
      productName: "Apple MacBook M1",
      unitPrice: 40000,
      quantity: 1,
      deliveryLocation: "CEA",
      deliveryMethodOptions: "Delivery",
      deliveryDate: "2024-12-03",
      deliveryTime: "11:00",
      shippingFee: 50,
      paymentMethod: "GCash",
    },
    {
      orderItemId: 3,
      orderItemImage:
        "https://img.ltwebstatic.com/images3_spmp/2023/05/19/1684480567b4c168018d222c224b27ece30b2d14f8_thumbnail_720x.jpg",
      buyerName: "userAlpha4",
      productName: "Some Colorful Notebooks",
      unitPrice: 200,
      quantity: 1,
      deliveryLocation: "Study Shed 2",
      deliveryMethodOptions: "Pickup",
      deliveryDate: "2024-12-05",
      deliveryTime: "15:00",
      shippingFee: 0,
      paymentMethod: "PayMaya",
    },
  ];

  const deliveryLocationOptions = [
    "CITC",
    "CEA",
    "Study Shed 2",
    "Study Shed 1",
    "CSM",
    "Gym Lobby",
    "Old CSM",
  ];

  const deliveryMethodOptions = ["Pickup", "Delivery"];

  const OrderPaymentMethod = [
    "Cash on Delivery",
    "GCash",
    "PayMaya",
    "Credit Card",
  ];

  const PaymentInformation = [
    {
      paymentMethod: "GCash",
      paymentInfo: "09123456789",
    },
    {
      paymentMethod: "PayMaya",
      paymentInfo: "09123456789",
    },
    {
      paymentMethod: "Credit Card",
      paymentInfo: "**** **** **** 1234",
    },
  ];

  const [orderItemsState, setorderItemsState] = useState(orderItems);

  return (
    <div>
      <div className="OrderHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 mx-5 rounded-2xl 2xl:mx-8 text-white text-center">
        <p>Checkout</p>
      </div>
      <div className="OrderBody flex flex-col xl:flex-row m-5 gap-4">
        <div className="OrderItemList shadow-2xl flex flex-col items-stretch xl:w-2/3 sm:w-full h-full rounded-xl px-4">
          {orderItemsState.map((item) => (
            <div
              key={item.orderItemId}
              className={`orderItem flex-1 h-full flex-col py-4 xl:max-h-[300px] px-4 ${
                orderItemsState.indexOf(item) !== orderItemsState.length - 1
                  ? "border-b-2 border-gray-400"
                  : ""
              }`}
            >
              <div className="orderItemTop flex justify-between h-[60px]">
                <div className="orderItemImage w-[15%] overflow-hidden rounded-xl">
                  <img
                    src={item.orderItemImage}
                    alt={item.productName}
                    className="Image w-32 h-32 object-cover"
                  />
                </div>
                <div className="w-full flex justify-between items-center p-4">
                  <div>
                    <p className="text-sm">{item.productName}</p>
                    <p className="text-sm text-gray-700 font-medium">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-right">
                      PHP {item.unitPrice * item.quantity}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {item.unitPrice} each
                    </p>
                  </div>
                </div>
              </div>
              <div className="OrderItemInfo flex gap-2 flex-col pt-4 w-full">
                <div className="OrderItemButtom flex flex-wrap items-end gap-2">
                  <div className="OrderItemProductLocation grow sm:basis-1/2 md:basis-1/5">
                    <select
                      value={item.deliveryLocation}
                      onChange={(e) => {
                        const value = e.target.value;
                        setorderItemsState(
                          orderItemsState.map((orderItem) =>
                            orderItem.orderItemId === item.orderItemId
                              ? { ...orderItem, deliveryLocation: value }
                              : orderItem
                          )
                        );
                      }}
                      className="w-full border-[1px] border-black rounded-2xl px-4"
                    >
                      {deliveryLocationOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="OrderItemDeliveryMethod grow sm:basis-1/2 md:basis-1/5">
                    <select
                      value={item.deliveryMethodOptions}
                      onChange={(e) => {
                        const value = e.target.value;
                        setorderItemsState(
                          orderItemsState.map((orderItem) =>
                            orderItem.orderItemId === item.orderItemId
                              ? { ...orderItem, deliveryMethodOptions: value }
                              : orderItem
                          )
                        );
                      }}
                      className="w-full border-[1px]  border-black rounded-2xl px-4"
                    >
                      {deliveryMethodOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="OrderItemDeliveryTime grow sm:basis-1/2 md:basis-1/5">
                    <input
                      type="time"
                      value={item.deliveryTime}
                      onChange={(e) => {
                        const value = e.target.value;
                        setorderItemsState(
                          orderItemsState.map((orderItem) =>
                            orderItem.orderItemId === item.orderItemId
                              ? { ...orderItem, deliveryTime: value }
                              : orderItem
                          )
                        );
                      }}
                      className="w-full border-[1px]  border-black rounded-2xl px-4 sm:w-full"
                    />
                  </div>
                  <div className="OrderItemDeliveryDate grow sm:basis-1/2 md:basis-1/5">
                    <input
                      type="date"
                      value={item.deliveryDate}
                      onChange={(e) => {
                        const value = e.target.value;
                        setorderItemsState(
                          orderItemsState.map((orderItem) =>
                            orderItem.orderItemId === item.orderItemId
                              ? { ...orderItem, deliveryDate: value }
                              : orderItem
                          )
                        );
                      }}
                      className="w-full border-[1px]  border-black rounded-2xl px-4 sm:w-full"
                    />
                  </div>
                </div>
                <div className="OrderPaymentMethod grow sm:basis-1/2 md:basis-1/5">
                  <select
                    value={item.paymentMethod}
                    onChange={(e) => {
                      const value = e.target.value;
                      setorderItemsState(
                        orderItemsState.map((orderItem) =>
                          orderItem.orderItemId === item.orderItemId
                            ? { ...orderItem, paymentMethod: value }
                            : orderItem
                        )
                      );
                    }}
                    className="w-full border-[1px]  border-black rounded-2xl px-4"
                  >
                    {OrderPaymentMethod.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="PaymentInfo flex flex-col lg:flex-col xl:w-1/3 lg:w-full">
          <div className="PaymentInfoBody shadow-2xl flex flex-col items-stretch sm:w-full rounded-xl p-8">
            <p className="border-b-2 border-gray-400 pb-4">Payment Info</p>
            {PaymentInformation.map((payment) => (
              <div className="PaymentInfoItem pt-4">
                <p className="PaymentMethod">{payment.paymentMethod}</p>
                <p className="PaymentInfo border-[1px] border-black p-2 rounded-xl mb-2">
                  {payment.paymentInfo}
                </p>
              </div>
            ))}
          </div>
          <div className="PaymentInfoButton mt-4">
            <button className="PlaceOrderButton bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 rounded-2xl text-white text-center w-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
