import React, { useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { supabase } from "../createClient";

interface Tax {
  id: number;
  low: number;
  high: number;
  amount: number;
}

const OrderPage = () => {
  interface ProductImage {
    PRODUCT_IMAGE: string;
    isMainImage: boolean;
  }

  interface Product {
    PROD_NAME: string;
    PROD_PRICE: number;
    SELLER_ID: string;
    DIM_PRODUCTIMAGES: ProductImage[];
  }

  interface Meetup {
    // Define fields in DIM_MEETUP table
    [key: string]: any;
  }

  interface Payment {
    PAYMENT_METHOD: PaymentMethod;
    PAYMENT_STATUS: string;
  }

  interface PaymentMethod {
    PAYMENT_METHOD: string;
  }

  interface Order {
    ORDER_ID: number;
    BUYER_FK: number;
    TAX_APPLIED: number;
    MEETUP_FK: number;
    QUANTITY: number;
    PRODUCT_FK: number;
    DIM_PAYMENT: Payment;
    DIM_MEETUP: Meetup;
    DIM_PRODUCT: Product;
  }

  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<Order[]>([]);

  const { isLoading, setIsLoading, user } = useAuthContext();
  const [subTotal, setSubTotal] = useState(0);
  const [Tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxes, setTaxes] = useState<Tax[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchTaxes();
  }, []);
  const fetchTaxes = async () => {
    try {
      const { data } = await supabase.from("DIM_TAX").select("*");
      if (data) {
        const tempTaxes: Tax[] = data.map((tax: any) => ({
          id: tax.TAX_ID,
          low: tax.TAX_BRACKET_LOW,
          high: tax.TAX_BRACKET_HIGH,
          amount: tax.TAX_AMOUNT,
        }));
        setTaxes(tempTaxes);
        console.log("TAX", taxes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOrders = async () => {
    console.log("Starting fetchOrders...");
    setIsLoading(true);

    try {
      const currentUserId = user?.id;
      if (!currentUserId) {
        console.error("User ID is not available. Cannot fetch orders.");
        throw new Error("User ID is required but not available.");
      }

      console.log("Fetching orders for user ID:", currentUserId);

      // Fetch orders placed by the user
      const fetchPlacedOrders = async () => {
        console.log("Fetching placed orders...");
        const { data, error } = await supabase
          .from("DIM_ORDER")
          .select(
            `
          ORDER_ID,
          BUYER_FK(USER_NAME),
          TAX_APPLIED,
          MEETUP_FK,
          QUANTITY,
          PRODUCT_FK,
          DIM_PAYMENT(
            PAYMENT_METHOD,
            DIM_PAYMENTMETHOD(
                PAYMENT_METHOD
          )
          ),
          DIM_MEETUP(
            *
          ),
          DIM_PRODUCT(
            PROD_NAME,
            PROD_PRICE,
            SELLER_ID,
            DIM_PRODUCTIMAGES(
              PRODUCT_IMAGE,
              isMainImage
            )
          )
        `
          )
          .eq("BUYER_FK", currentUserId);

        if (error) {
          console.error("Error fetching placed orders:", error.message);
          throw new Error(`Error fetching placed orders: ${error.message}`);
        }

        console.log("Raw placed orders data fetched:", data);

        return data.map((order: any) => {
          console.log("Mapping placed order:", order);
          return {
            ORDER_ID: order.ORDER_ID,
            BUYER_FK: order.BUYER_FK,
            TAX_APPLIED: order.TAX_APPLIED,
            MEETUP_FK: order.MEETUP_FK,
            QUANTITY: order.QUANTITY,
            PRODUCT_FK: order.PRODUCT_FK,
            DIM_PAYMENT: order.DIM_PAYMENT?.[0] || null,
            DIM_MEETUP: order.DIM_MEETUP?.[0] || null,
            DIM_PRODUCT: {
              PROD_NAME: order.DIM_PRODUCT?.[0]?.PROD_NAME || "Unknown Product",
              PROD_PRICE: order.DIM_PRODUCT?.[0]?.PROD_PRICE || 0,
              SELLER_ID: order.DIM_PRODUCT?.[0]?.SELLER_ID || null,
              DIM_PRODUCTIMAGES:
                order.DIM_PRODUCT?.[0]?.DIM_PRODUCTIMAGES || [],
            },
          };
        });
      };

      // Fetch orders for the user's products
      const fetchReceivedOrders = async () => {
        console.log("Fetching received orders...");
        const { data, error } = await supabase
          .from("DIM_ORDER")
          .select(
            `
          ORDER_ID,
          BUYER_FK,
          TAX_APPLIED,
          MEETUP_FK,
          QUANTITY,
          PRODUCT_FK,
          DIM_PAYMENT(
            PAYMENT_METHOD,
            PAYMENT_STATUS,
            DIM_PAYMENTMETHOD(
              PAYMENT_METHOD)
          ),
          DIM_MEETUP(
            *
          ),
          DIM_PRODUCT(
            PROD_NAME,
            PROD_PRICE,
            SELLER_ID,
            DIM_PRODUCTIMAGES(
              PRODUCT_IMAGE,
              isMainImage
            )
          )
        `
          )
          .filter("DIM_PRODUCT.SELLER_ID", "eq", currentUserId);

        if (error) {
          console.error("Error fetching received orders:", error.message);
          throw new Error(`Error fetching received orders: ${error.message}`);
        }

        console.log("Raw received orders data fetched:", data);

        return data.map((order: any) => {
          console.log("Mapping received order:", order);
          return {
            ORDER_ID: order.ORDER_ID,
            BUYER_FK: order.BUYER_FK,
            TAX_APPLIED: order.TAX_APPLIED,
            MEETUP_FK: order.MEETUP_FK,
            QUANTITY: order.QUANTITY,
            PRODUCT_FK: order.PRODUCT_FK,
            DIM_PAYMENT: order.DIM_PAYMENT?.[0] || null,
            DIM_MEETUP: order.DIM_MEETUP?.[0] || null,
            DIM_PRODUCT: {
              PROD_NAME: order.DIM_PRODUCT?.[0]?.PROD_NAME || "Unknown Product",
              PROD_PRICE: order.DIM_PRODUCT?.[0]?.PROD_PRICE || 0,
              SELLER_ID: order.DIM_PRODUCT?.[0]?.SELLER_ID || null,
              DIM_PRODUCTIMAGES:
                order.DIM_PRODUCT?.[0]?.DIM_PRODUCTIMAGES || [],
            },
          };
        });
      };

      // Fetch data in parallel
      console.log("Fetching both placed and received orders in parallel...");
      const [placedOrdersNotState, receivedOrdersNotState] = await Promise.all([
        fetchPlacedOrders(),
        fetchReceivedOrders(),
      ]);

      console.log(
        "Placed orders successfully fetched and mapped:",
        placedOrdersNotState
      );
      console.log(
        "Received orders successfully fetched and mapped:",
        receivedOrdersNotState
      );

      setPlacedOrders(placedOrdersNotState);
      setReceivedOrders(receivedOrdersNotState);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in fetchOrders:", error.message);
      } else {
        console.error("Unexpected error in fetchOrders:", error);
      }
    } finally {
      console.log("Fetching orders complete. Setting loading to false.");
      setIsLoading(false);

      console.log("Final placedOrders state:", placedOrders);
      console.log("Final receivedOrders state:", receivedOrders);
    }
  };

  useEffect(() => {
    console.log("placedOrders updated:", placedOrders);
    console.log("receivedOrders updated:", receivedOrders);
  }, [setPlacedOrders, setReceivedOrders]);

  useEffect(() => {
    console.log("Fetching orders...");
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log("placedOrders updated:", placedOrders);
    console.log("receivedOrders updated:", receivedOrders);
  }, [placedOrders, receivedOrders]);

  const orderItems = [
    {
      cartId: "1",
      cartItems: [
        {
          cartItemId: 1,
          cartItemImage:
            "https://www.kalkstore.com/cdn/shop/articles/KL_WEB_BLOG_PORTADA_4420x2400_df689793-0c08-4d64-8872-7b415597a5ac.jpg?v=1654701916&width=700",
          buyerName: "userAlpha4",
          productName: "Big K Sling Chainbag",
          totalPrice: 400,
          quantity: 4,
          deliveryLocation: "CITC",
          deliveryMethodOptions: "Pickup",
          deliveryDate: "2022-12-31",
          deliveryTime: "10:00",
          tax: 0,
        },
        {
          cartItemId: 2,
          cartItemImage:
            "https://media.karousell.com/media/photos/products/2024/9/9/macbook_air_2018_13inch_core_i_1725901665_e2991c14_progressive.jpg",
          buyerName: "grandnationalExperimental",
          productName: "Apple MacBook M1",
          totalPrice: 40000,
          quantity: 1,
          deliveryLocation: "CEA",
          deliveryMethodOptions: "Delivery",
          deliveryDate: "2022-12-31",
          deliveryTime: "11:00",
          tax: 50,
        },
        {
          cartItemId: 3,
          cartItemImage:
            "https://img.ltwebstatic.com/images3_spmp/2023/05/19/1684480567b4c168018d222c224b27ece30b2d14f8_thumbnail_720x.jpg",
          buyerName: "userAlpha4",
          productName: "Some Colorful Notebooks",
          totalPrice: 200,
          quantity: 1,
          deliveryLocation: "Study Shed 2",
          deliveryMethodOptions: "Pickup",
          deliveryDate: "2022-12-31",
          deliveryTime: "15:00",
          tax: 0,
        },
      ],
    },
  ];

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
            {placedOrders ? (
              placedOrders?.map((order) => (
                <div className="flex flex-row my-5">
                  <img
                    src={
                      order.DIM_PRODUCT?.DIM_PRODUCTIMAGES?.[0]
                        ?.PRODUCT_IMAGE ||
                      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    }
                    alt="Product"
                    className="orderItemImage w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex flex-row items-center justify-between w-full ml-5">
                    <div className="OrderItemInformation">
                      <p className="OrderItemName text-lg md:text-sm xl:text-base">
                        {order.DIM_PRODUCT.PROD_NAME}
                      </p>
                      <p className="orderItemQuantity text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Quantity: {order.QUANTITY}
                      </p>
                      <p className="orderItemLocation text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Location: {order.DIM_MEETUP?.MEETUP_LOCATION}
                      </p>
                      <p className="orderItemPayment text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Payment Option:{" "}
                        {order.DIM_PAYMENT.PAYMENT_METHOD.PAYMENT_METHOD}
                      </p>
                      <p className="orderItemTime text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Time: {order.DIM_MEETUP?.MEETUP_TIME}, at{" "}
                        {order.DIM_MEETUP?.MEETUP_DATE}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders placed</p>
            )}
          </div>
        </div>
      </div>
      <div className="OrderItemList shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col items-stretch rounded-xl px-5 m-5 h-full">
        <div className={"orderItem flex-1 flex-col p-5"}>
          <div className="orderItemTop flex flex-col justify-between">
            <p className="text-2xl py-4">Orders Placed</p>
            <div></div>
            {receivedOrders ? (
              receivedOrders?.map((order) => (
                <div className="flex flex-row my-5">
                  <img
                    src={
                      order.DIM_PRODUCT?.DIM_PRODUCTIMAGES?.[0]
                        ?.PRODUCT_IMAGE ||
                      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    }
                    alt="Product"
                    className="orderItemImage w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex flex-row items-center justify-between w-full ml-5">
                    <div className="OrderItemInformation">
                      <p className="OrderItemName text-lg md:text-sm xl:text-base">
                        {order.DIM_PRODUCT.PROD_NAME}
                      </p>
                      <p className="orderItemQuantity text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Quantity: {order.QUANTITY}
                      </p>
                      <p className="orderItemLocation text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Location: {order.DIM_MEETUP?.MEETUP_LOCATION}
                      </p>
                      <p className="orderItemPayment text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Payment Option:{" "}
                        {order.DIM_PAYMENT.PAYMENT_METHOD.PAYMENT_METHOD}
                      </p>
                      <p className="orderItemTime text-xs md:text-sm xl:text-base text-gray-700 font-medium">
                        Time: {order.DIM_MEETUP?.MEETUP_TIME}, at{" "}
                        {order.DIM_MEETUP?.MEETUP_DATE}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders placed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
