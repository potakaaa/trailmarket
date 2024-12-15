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
  const [filteredPlacedOrders, setFilteredPlacedOrders] = useState<any[]>([]);
  const [filteredReceivedOrders, setFilteredReceivedOrders] = useState<any[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [placedFilter, setPlacedFilter] = useState("All");
  const [receivedFilter, setReceivedFilter] = useState("All");

  const { setIsLoading, user } = useAuthContext();
  const [taxes, setTaxes] = useState<Tax[]>([]);

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

  const handleOpenModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const applyFilters = () => {
    console.log("Applying Filters...");
    console.log("Current Placed Orders:", placedOrders);
    console.log("Current Received Orders:", receivedOrders);

    console.log("Placed Filter:", placedFilter);
    console.log("Received Filter:", receivedFilter);

    // Apply placed filter
    const updatedPlacedOrders =
      placedFilter === "All"
        ? placedOrders
        : placedOrders.filter((order) => {
            console.log(
              `Checking Placed Order: ${order.payment.payment_status?.toLowerCase()} against ${placedFilter.toLowerCase()}`
            );
            return (
              order.payment.payment_status &&
              order.payment.payment_status.toLowerCase() ===
                placedFilter.toLowerCase()
            );
          });

    // Apply received filter
    const updatedReceivedOrders =
      receivedFilter === "All"
        ? receivedOrders
        : receivedOrders.filter((order) => {
            console.log(
              `Checking Received Order: ${order.payment.payment_status?.toLowerCase()} against ${receivedFilter.toLowerCase()}`
            );
            return (
              order.payment.payment_status &&
              order.payment.payment_status.toLowerCase() ===
                receivedFilter.toLowerCase()
            );
          });

    console.log("Filtered Placed Orders:", updatedPlacedOrders);
    console.log("Filtered Received Orders:", updatedReceivedOrders);

    setFilteredPlacedOrders(updatedPlacedOrders);
    setFilteredReceivedOrders(updatedReceivedOrders);
  };
  useEffect(() => {
    applyFilters();
  }, [placedOrders, receivedOrders, placedFilter, receivedFilter]);

  async function getPlacedOrders() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("DIM_ORDER")
      .select(
        `
        ORDER_ID, 
        QUANTITY, 
        DIM_TAX(TAX_AMOUNT),
        DIM_PRODUCT(PRODUCT_ID, PROD_NAME, PROD_PRICE, DIM_PRODUCTIMAGES(PRODUCT_IMAGE, isMainImage)), 
        DIM_MEETUP(MEETUP_ID, MEETUP_LOCATION, MEETUP_DATE, MEETUP_TIME), 
        DIM_PAYMENT(PAYMENT_STATUS, PAYMENT_METHOD(PAYMENT_METHOD, ACCOUNT_NUMBER))
        
        `
      )
      .eq("BUYER_FK", user?.id);

    console.log("Data:", JSON.stringify(data, null, 2));
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
              meetup_id: order.DIM_MEETUP.MEETUP_ID,
              meetup_location: order.DIM_MEETUP.MEETUP_LOCATION,
              meetup_date: order.DIM_MEETUP.MEETUP_DATE,
              meetup_time: order.DIM_MEETUP.MEETUP_TIME,
            },
            payment: {
              payment_status: order.DIM_PAYMENT[0].PAYMENT_STATUS,
              payment_method: {
                payment_method:
                  order.DIM_PAYMENT[0]?.PAYMENT_METHOD.PAYMENT_METHOD,
                account_number:
                  order.DIM_PAYMENT[0]?.PAYMENT_METHOD.ACCOUNT_NUMBER,
              },
            },
            tax: {
              tax_amount: order.DIM_TAX.TAX_AMOUNT,
            },
          };
        });
        setPlacedOrders(orders);
        console.log("State Orders:", orders);
      }
      setIsLoading(false);
    }
  }
  const updatePaymentStatus = async (orderId: number, newStatus: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("DIM_PAYMENT")
        .update({ PAYMENT_STATUS: newStatus })
        .eq("ORDER_FK", orderId);

      if (error) {
        console.error("Error updating payment status:", error.message);
        alert("An error occurred while updating the payment status.");
        return;
      }

      console.log("Payment status updated:", data);

      // Update state
      setReceivedOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId
            ? {
                ...order,
                payment: {
                  ...order.payment,
                  payment_status: newStatus,
                },
              }
            : order
        )
      );

      alert("Payment status updated successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  async function getReceivedOrders() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("DIM_ORDER")
      .select(
        `
    ORDER_ID, 
    QUANTITY, 
    DIM_PRODUCT!inner(PRODUCT_ID, PROD_NAME, PROD_PRICE, SELLER_ID, DIM_PRODUCTIMAGES(PRODUCT_IMAGE, isMainImage)), 
    DIM_MEETUP(MEETUP_ID, MEETUP_LOCATION, MEETUP_DATE, MEETUP_TIME), 
    DIM_PAYMENT(PAYMENT_STATUS, PAYMENT_METHOD(PAYMENT_METHOD, ACCOUNT_NUMBER))
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
              meetup_id: order.DIM_MEETUP.MEETUP_ID,
              meetup_location: order.DIM_MEETUP.MEETUP_LOCATION,
              meetup_date: order.DIM_MEETUP.MEETUP_DATE,
              meetup_time: order.DIM_MEETUP.MEETUP_TIME,
            },
            payment: {
              payment_status: order.DIM_PAYMENT[0].PAYMENT_STATUS,
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

  const deleteOrder = async (meetupId: number) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("DIM_MEETUP")
        .delete()
        .eq("MEETUP_ID", meetupId);

      if (error) {
        console.error("Error deleting order:", error.message);
        alert("An error occurred while deleting the order.");
        return;
      }

      alert("Order deleted successfully!");

      // Refresh the orders after deletion
      getPlacedOrders();
      getReceivedOrders();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlacedOrders();
    getReceivedOrders();
    applyFilters();
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
            <select
              value={placedFilter}
              onChange={(e) => setPlacedFilter(e.target.value)}
              className="border-2 border-black rounded-lg p-2"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <div></div>
            {filteredPlacedOrders.length > 0 ? (
              filteredPlacedOrders?.map((order) => (
                <div key={order.id} className="flex flex-row my-5">
                  <button
                    className="flex flex-row w-full"
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

                    <div className="flex flex-row items-center justify-between w-full text-left ml-5">
                      <div className="OrderItemInformation w-full">
                        <p className="OrderItemName text-sm md:text-lg xl:text-base">
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
                  <div className="flex flex-col gap-3 md:flex-row md:gap-0 w-full h-full justify-end items-center self-center">
                    <select
                      className="border-2 border-black rounded-lg p-2 ml-5 h-full self-end md:self-center"
                      value={order.payment.payment_status}
                      disabled
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <select
                      className="border-2 border-black rounded-lg p-2 ml-5 h-full self-end md:self-center"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "Delete") {
                          deleteOrder(order.meetup.meetup_id); // Call delete function
                        } else if (value === "Details") {
                          handleOpenModal(order); // Open the modal with order details
                        }
                        // Reset the select value back to "Options" after the action
                        e.target.value = "Options";
                      }}
                      defaultValue="Options"
                    >
                      <option value="Options" disabled>
                        Options
                      </option>
                      {order.payment.payment_status === "Completed" && (
                        <option value="Delete">Delete</option>
                      )}
                      <option value="Details">Details</option>
                    </select>
                  </div>
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
            <select
              value={receivedFilter}
              onChange={(e) => setReceivedFilter(e.target.value)} // Use receivedFilter
              className="border-2 border-black rounded-lg p-2 "
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <div></div>
            {filteredReceivedOrders.length > 0 ? (
              filteredReceivedOrders?.map((order) => (
                <div key={order.id} className="flex flex-row my-5">
                  <button
                    className="flex flex-row w-full"
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

                    <div className="flex flex-row items-center justify-between w-full ml-5 text-left">
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
                  <div className="flex flex-col gap-3 md:flex-row md:gap-0 w-full h-full justify-end items-center self-center">
                    <select
                      className="border-2 border-black rounded-lg p-2 ml-5 h-full self-end md:self-center"
                      value={order.payment.payment_status}
                      onChange={(e) =>
                        updatePaymentStatus(order.order_id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                    {order.payment.payment_status === "Completed" && (
                      <select
                        className="border-2 border-black rounded-lg p-2 ml-5 h-full self-end md:self-center"
                        onChange={(e) => {
                          if (e.target.value === "Delete") {
                            deleteOrder(order.meetup.meetup_id);
                          }
                        }}
                        defaultValue="Options"
                      >
                        <option value="Options" disabled>
                          Options
                        </option>
                        <option value="Delete">Delete</option>
                      </select>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders Received</p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
          tax={selectedOrder.tax.tax_amount}
        ></OrderDetailsModal>
      )}
    </div>
  );
};

export default OrderPage;

const OrderDetailsModal = ({
  order,
  tax,
  onClose,
}: {
  order: any;
  tax: number;
  onClose: () => void;
}) => {
  if (!order) return null;

  // Calculate subtotal, tax, and total
  const subTotal = order.quantity * order.product.price;

  const taxAmount = tax ? Math.round((tax / 100) * subTotal) : 0;

  const totalPrice = subTotal + taxAmount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 w-3/4 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="font-medium">
          <strong>Product:</strong> {order.product.name}
        </p>
        <p className="font-medium">
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p className="font-medium">
          <strong>Price:</strong> PHP {order.product.price}
        </p>
        <p className="font-medium">
          <strong>Subtotal:</strong> PHP {subTotal}
        </p>
        <p className="font-medium">
          <strong>Tax:</strong> PHP {taxAmount}
        </p>
        <p className="font-medium">
          <strong>Total Price:</strong> PHP {totalPrice}
        </p>
        <p className="font-medium">
          <strong>Meetup Location:</strong> {order.meetup.meetup_location}
        </p>
        <p className="font-medium">
          <strong>Meetup Date:</strong> {order.meetup.meetup_date}
        </p>
        <p className="font-medium">
          <strong>Meetup Time:</strong> {order.meetup.meetup_time}
        </p>
        <p className="font-medium">
          <strong>Payment Method:</strong>{" "}
          {order.payment.payment_method.payment_method}
        </p>
        <p className="font-medium">
          <strong>Payment Status:</strong> {order.payment.payment_status}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};
