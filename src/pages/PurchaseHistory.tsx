import React, { useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { supabase } from "../createClient";
import { Product } from "./context/Globals";
import { User } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Tax {
  id: number;
  low: number;
  high: number;
  amount: number;
}

const OrderPage = () => {
  const nav = useNavigate();

  const [placedOrders, setPlacedOrders] = useState<any[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<any[]>([]);

  const { setIsLoading, user } = useAuthContext();
  const [taxes, setTaxes] = useState<Tax[]>([]);

  async function getPlacedOrders() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("DIM_ORDER")
      .select(
        `
        ORDER_ID, 
        QUANTITY, 
        DIM_PRODUCT(PRODUCT_ID, PROD_NAME, PROD_PRICE, DIM_PRODUCTIMAGES(PRODUCT_IMAGE, isMainImage)), 
        DIM_MEETUP(MEETUP_LOCATION, MEETUP_DATE, MEETUP_TIME), 
        DIM_PAYMENT(PAYMENT_METHOD(PAYMENT_METHOD, ACCOUNT_NUMBER))
        `
      )
      .eq("BUYER_FK", user?.id);
    if (error) {
      console.error("Error fetching orders:", error.message);
      alert("An error occurred while fetching orders.");
      setIsLoading(false);
      return;
    }
    if (data) {
      console.log("Data:", JSON.stringify(data, null, 2));
      if (data.length === 0) {
        setIsLoading(false);
        return;
      } else {
        const orders = data.map((order: any) => {
          return {
            order_id: order.ORDER_ID,
            quantity: order.QUANTITY,
            product: {
              id: order.DIM_PRODUCT.PRODUCT_ID,
              name: order.DIM_PRODUCT.PROD_NAME,
              price: order.DIM_PRODUCT.PROD_PRICE,
              image: order.DIM_PRODUCT.DIM_PRODUCTIMAGES[0].PRODUCT_IMAGE,
            },
            meetup: {
              meetup_location: order.DIM_MEETUP.MEETUP_LOCATION,
              meetup_date: order.DIM_MEETUP.MEETUP_DATE,
              meetup_time: order.DIM_MEETUP.MEETUP_TIME,
            },
            payment: {
              payment_method: {
                payment_method:
                  order.DIM_PAYMENT[0]?.PAYMENT_METHOD.PAYMENT_METHOD,
                account_number:
                  order.DIM_PAYMENT[0]?.PAYMENT_METHOD.ACCOUNT_NUMBER,
              },
            },
          };
        });
        setPlacedOrders(orders);
        console.log("State Orders:", orders);
      }
      setIsLoading(false);
    }
  }

  async function getReceivedOrders() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("DIM_ORDER")
      .select(
        `
    ORDER_ID, 
    QUANTITY, 
    DIM_PRODUCT!inner(PRODUCT_ID, PROD_NAME, PROD_PRICE, SELLER_ID, DIM_PRODUCTIMAGES(PRODUCT_IMAGE, isMainImage)), 
    DIM_MEETUP(MEETUP_LOCATION, MEETUP_DATE, MEETUP_TIME), 
    DIM_PAYMENT(PAYMENT_METHOD(PAYMENT_METHOD, ACCOUNT_NUMBER))
    `
      )
      .eq("DIM_PRODUCT.SELLER_ID", user?.id);
    if (error) {
      console.error("Error fetching orders:", error.message);
      alert("An error occurred while fetching orders.");
      setIsLoading(false);
      return;
    }
    if (data) {
      console.log("Data of Recieved:", JSON.stringify(data, null, 2));
      if (data.length === 0) {
        setIsLoading(false);
        return;
      } else {
        const orders = data.map((order: any) => {
          return {
            order_id: order.ORDER_ID,
            quantity: order.QUANTITY,
            product: {
              id: order.DIM_PRODUCT.PRODUCT_ID,
              name: order.DIM_PRODUCT.PROD_NAME,
              price: order.DIM_PRODUCT.PROD_PRICE,
              image: order.DIM_PRODUCT.DIM_PRODUCTIMAGES[0].PRODUCT_IMAGE,
            },
            meetup: {
              meetup_location: order.DIM_MEETUP.MEETUP_LOCATION,
              meetup_date: order.DIM_MEETUP.MEETUP_DATE,
              meetup_time: order.DIM_MEETUP.MEETUP_TIME,
            },
            payment: {
              payment_method: {
                payment_method:
                  order.DIM_PAYMENT[0]?.PAYMENT_METHOD.PAYMENT_METHOD,
                account_number:
                  order.DIM_PAYMENT[0]?.PAYMENT_METHOD.ACCOUNT_NUMBER,
              },
            },
          };
        });
        setReceivedOrders(orders);
        console.log("State Orders:", orders);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getPlacedOrders();
    getReceivedOrders();
  }, []);

  return (
    <div className="pb-4">
      <div className="CartHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 mx-5 rounded-2xl text-white text-center">
        <h1 className="text-2xl">Orders</h1>
      </div>
      <div className="OrderItemList shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col items-stretch rounded-xl px-5 m-5 h-full">
        <div className={"orderItem flex-1 flex-col p-5"}>
          <div className="orderItemTop flex flex-col justify-between">
            <p className="text-2xl py-4">Orders Placed</p>
            <div></div>
            {placedOrders.length > 0 ? (
              placedOrders?.map((order) => (
                <div key={order.id} className="flex flex-row my-5">
                  <button
                    className="flex flex-row"
                    onClick={() => nav("/product/" + order.product.id)}
                  >
                    <img
                      src={
                        order.product.image ||
                        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                      }
                      alt="Product"
                      className="orderItemImage w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex flex-row items-center justify-between w-full ml-5">
                      <div className="OrderItemInformation">
                        <p className="OrderItemName text-lg md:text-sm xl:text-base">
                          {order.product.name}
                        </p>
                        <p className="orderItemQuantity text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Quantity: {order.quantity}
                        </p>
                        <p className="orderItemLocation text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Location: {order.meetup.meetup_location}
                        </p>
                        <p className="orderItemPayment text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Payment Option:{" "}
                          {order.payment.payment_method.payment_method}
                        </p>
                        <p className="orderItemTime text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Time: {order.meetup.meetup_time}, at{" "}
                          {order.meetup.meetup_date}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <p>No orders Placed</p>
            )}
          </div>
        </div>
      </div>
      <div className="OrderItemList shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col items-stretch rounded-xl px-5 m-5 h-full">
        <div className={"orderItem flex-1 flex-col p-5"}>
          <div className="orderItemTop flex flex-col justify-between">
            <p className="text-2xl py-4">Orders Recieved</p>
            <div></div>
            {receivedOrders.length > 0 ? (
              receivedOrders?.map((order) => (
                <div key={order.id} className="flex flex-row my-5">
                  <button
                    className="flex flex-row"
                    onClick={() => nav("/product/" + order.product.id)}
                  >
                    <img
                      src={
                        order.product.image ||
                        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                      }
                      alt="Product"
                      className="orderItemImage w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex flex-row items-center justify-between w-full ml-5">
                      <div className="OrderItemInformation">
                        <p className="OrderItemName text-lg md:text-sm xl:text-base">
                          {order.product.name}
                        </p>
                        <p className="orderItemQuantity text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Quantity: {order.quantity}
                        </p>
                        <p className="orderItemLocation text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Location: {order.meetup.meetup_location}
                        </p>
                        <p className="orderItemPayment text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Payment Option:{" "}
                          {order.payment.payment_method.payment_method}
                        </p>
                        <p className="orderItemTime text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                          Time: {order.meetup.meetup_time}, at{" "}
                          {order.meetup.meetup_date}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <p>No orders Recieved</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
