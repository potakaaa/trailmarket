import { useEffect, useState } from "react";
import {
  Tax,
  useAuthContext,
  UserPayment,
  CheckoutProd,
} from "./context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

const CheckoutPage = () => {
  const {
    checkoutProds,
    setCheckoutProds,
    taxes,
    setTaxes,
    totalAmount,
    setTotalAmount,
    user,
    userPayment,
    setUserPayment,
    setIsLoading,
  } = useAuthContext();

  const [sellerPayments, setSellerPayments] = useState<any>([
    "Cash on Delivery",
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const loc = useLocation();
  const nav = useNavigate();

  const deliveryLocationOptions = [
    "CITC",
    "CEA",
    "Study Shed 2",
    "Study Shed 1",
    "CSM",
    "Gym Lobby",
    "Old CSM",
  ];

  useEffect(() => {
    console.log("Updated Checkout Products:", checkoutProds);
  }, [checkoutProds]);

  const fetchSellerPaymentMethods = async () => {
    try {
      const sellerIds = [
        ...new Set(checkoutProds.map((prod) => prod.sellerId)),
      ];

      console.log("Seller IDs:", sellerIds);

      if (sellerIds.length === 0) {
        console.warn("No valid seller IDs found in checkoutProds.");
        return;
      }

      const { data, error } = await supabase
        .from("DIM_PAYMENTMETHOD")
        .select("*")
        .in("USER_PAY_FK", sellerIds);

      if (error) {
        console.error("Error fetching seller payment methods:", error);
        return;
      }

      const paymentMethodsBySeller: {
        [key: number]: { paymentMethod: string; paymentNumber: string }[];
      } = sellerIds.reduce(
        (
          acc: {
            [key: number]: { paymentMethod: string; paymentNumber: string }[];
          },
          sellerId: number
        ) => {
          const sellerPayments = data
            .filter((payment) => payment.USER_PAY_FK === sellerId)
            .map((payment) => ({
              paymentMethod: payment.PAYMENT_METHOD,
              paymentNumber: payment.ACCOUNT_NUMBER,
            }))
            .filter((payment) => payment.paymentMethod);

          acc[sellerId] = [
            { paymentMethod: "Cash on Delivery", paymentNumber: "" },
            ...sellerPayments,
          ];

          return acc;
        },
        {}
      );
      sellerIds.forEach((sellerId) => {
        if (!paymentMethodsBySeller[sellerId]) {
          paymentMethodsBySeller[sellerId] = [];
        }
      });

      setSellerPayments(paymentMethodsBySeller);
      console.log("Seller Payments:", paymentMethodsBySeller);
    } catch (error) {
      console.error("Unexpected error fetching seller payment methods:", error);
    }
  };

  const fetchUserPayment = async () => {
    const { data, error } = await supabase
      .from("DIM_PAYMENTMETHOD")
      .select("*")
      .eq("USER_PAY_FK", user?.id);

    if (error) {
      console.error("Error fetching payment data:", error);
    }
    if (data) {
      console.log(data);
      const tempUserPay: UserPayment[] = data.map((payment: any) => ({
        paymentMethod: payment.PAYMENT_METHOD,
        paymentNumber: payment.ACCOUNT_NUMBER,
      }));
      setUserPayment(tempUserPay);
      console.log("USER PAYMENT", userPayment);
    }
  };

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

  const calculateTax = () => {
    const tempTax = taxes.find(
      (tax) => subTotal >= tax.low && subTotal <= tax.high
    );

    const calculatedTax = tempTax ? (tempTax.amount / 100) * subTotal : 0; // Default to 0 if no tax bracket matches

    setTax(calculatedTax); // Update the tax state

    const newTotalAmount = subTotal + calculatedTax;
    setTotalAmount(Math.round(newTotalAmount)); // Update total amount
    console.log(
      "Subtotal:",
      subTotal,
      "Tax:",
      calculatedTax,
      "Total:",
      newTotalAmount
    );

    return tempTax ? tempTax.id : null; // Return tax ID or null
  };

  const calculateSubTotal = () => {
    const tempSubTotal = checkoutProds.reduce((sum: number, item: any) => {
      return sum + item?.prodPrice * item?.quantity;
    }, 0);

    console.log(tempSubTotal);
    setSubTotal(tempSubTotal);
  };

  useEffect(() => {
    console.log("Checkout Products:", checkoutProds);

    fetchTaxes();
    fetchUserPayment();
    fetchSellerPaymentMethods();
  }, []);

  useEffect(() => {
    calculateSubTotal();
  }, [checkoutProds]);

  useEffect(() => {
    if (subTotal > 0) {
      calculateTax();
    }
  }, [subTotal]);

  useEffect(() => {
    console.log("Final Total Amount:", totalAmount);
  }, [totalAmount]);

  useEffect(() => {
    if (loc.pathname != "/checkout") {
    }
  }, [totalAmount]);

  const handleCheckoutProdChange = (
    orderId: number,
    field: keyof CheckoutProd,
    value: string
  ) => {
    const updatedProds = checkoutProds.map((prod) =>
      prod.order_id === orderId ? { ...prod, [field]: value } : prod
    );
    setCheckoutProds(updatedProds);
  };

  useEffect(() => {
    const updatedProds = checkoutProds.map((prod) => {
      const defaultPaymentMethod =
        sellerPayments[prod.sellerId]?.[0]?.paymentMethod || "Cash on Delivery";
      const defaultMeetupLoc = deliveryLocationOptions[0];

      return {
        ...prod,
        paymentMethod: prod.paymentMethod || defaultPaymentMethod,
        meetupLoc: prod.meetupLoc || defaultMeetupLoc,
      };
    });

    const isDifferent = updatedProds.some(
      (updatedProd, index) =>
        updatedProd.paymentMethod !== checkoutProds[index].paymentMethod ||
        updatedProd.meetupLoc !== checkoutProds[index].meetupLoc
    );

    if (isDifferent) {
      setCheckoutProds(updatedProds);
    }
  }, [checkoutProds, sellerPayments, deliveryLocationOptions]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      for (const prod of checkoutProds) {
        const meetupData = {
          MEETUP_LOCATION: prod.meetupLoc || deliveryLocationOptions[0],
          MEETUP_DATE:
            prod.meetupDate || new Date().toISOString().split("T")[0], // Default to today
          MEETUP_TIME: prod.meetupTime || "00:00",
        };

        const { data: meetupRes, error: meetupError } = await supabase
          .from("DIM_MEETUP")
          .insert([meetupData])
          .select(); // Use `.select()` to return the inserted row(s)

        if (meetupError) {
          console.error("Error inserting meetup data:", meetupError);
          alert(
            "An error occurred while processing meetup data. Please try again."
          );
          return;
        }

        const meetupId = meetupRes?.[0]?.MEETUP_ID;
        console.log("Meetup ID:", meetupId);
        const taxId = calculateTax();

        // 3. Insert Order Data
        const orderData = {
          PRODUCT_FK: prod.prod_fk,
          MEETUP_FK: meetupId, // Foreign key to the meetup table
          QUANTITY: prod.quantity,
          TAX_APPLIED: taxId,
          BUYER_FK: user?.id, // Assuming the logged-in user's ID
        };

        const { data: orderRes, error: orderError } = await supabase
          .from("DIM_ORDER")
          .insert([orderData])
          .select();

        if (orderError) {
          console.error("Error inserting order data:", orderError);
          alert(
            "An error occurred while processing the order. Please try again."
          );
          return;
        }

        console.log("Order Inserted:", orderRes);
        const orderId = orderRes?.[0]?.ORDER_ID; // Get the generated `order_id`
        console.log("Order ID:", orderId);

        const selectedPayment = sellerPayments[prod.sellerId]?.find(
          (option: { paymentMethod: string; paymentNumber: string }) =>
            option.paymentMethod === prod.paymentMethod
        );

        if (!selectedPayment) {
          console.error(
            `Payment method "${prod.paymentMethod}" not found for seller ${prod.sellerId}`
          );
          alert("Invalid payment method selected. Please try again.");
          return;
        }

        const paymentMethodId = selectedPayment.paymentMethodId;

        // 2. Insert Payment Data
        const paymentData = {
          PAYMENT_METHOD: paymentMethodId || "0",
          PAYMENT_DATE: null,
          PAYMENT_STATUS: "Pending", // Default status
          ORDER_FK: orderId,
        };

        const { data: paymentRes, error: paymentError } = await supabase
          .from("DIM_PAYMENT")
          .insert([paymentData])
          .select();

        if (paymentError) {
          console.error("Error inserting payment data:", paymentError);
          alert(
            "An error occurred while processing payment data. Please try again."
          );
          return;
        }

        const paymentId = paymentRes?.[0]?.id;
        console.log("Payment ID:", paymentId);

        // Subtract Ordered Quantity from Product Stock
        const { data: productData, error: productError } = await supabase
          .from("DIM_PRODUCT")
          .select("PROD_STOCKS")
          .eq("PRODUCT_ID", prod.prod_fk)
          .single();

        if (productError) {
          console.error("Error fetching product stock:", productError);
          alert(
            "An error occurred while fetching product stock. Please try again."
          );
          return;
        }

        const newStock = (productData?.PROD_STOCKS || 0) - prod.quantity;

        if (newStock < 0) {
          alert(
            `Insufficient stock for Product ID ${prod.prod_fk}. Please reduce the quantity.`
          );
          return;
        }

        const { error: stockUpdateError } = await supabase
          .from("DIM_PRODUCT")
          .update({ PROD_STOCKS: newStock }) // Update the stock with the new value
          .eq("PRODUCT_ID", prod.prod_fk);

        if (stockUpdateError) {
          console.error("Error updating product stock:", stockUpdateError);
          alert(
            "An error occurred while updating the product stock. Please try again."
          );
          return;
        }

        console.log(
          `Stock updated for Product ID ${prod.prod_fk}, New Stock: ${newStock}`
        );
      }

      alert("All orders placed successfully!");
      setCheckoutProds([]); // Clear the cart
      nav("/purchaseHistory");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="OrderHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 mx-5 rounded-2xl 2xl:mx-8 text-white text-center">
        <p>Checkout</p>
      </div>
      <div className="OrderBody flex flex-col xl:flex-row m-5 gap-4">
        <div className="OrderItemList shadow-2xl flex flex-col items-stretch xl:w-2/3 sm:w-full h-full rounded-xl px-4">
          {checkoutProds.map((item) => (
            <div
              key={item.order_id}
              className={`orderItem flex-1 h-full flex-col py-4 xl:max-h-[300px] px-4 ${
                checkoutProds ? "border-b-2 border-gray-400" : ""
              }`}
            >
              <div className="orderItemTop flex justify-between h-full">
                <div className="orderItemImage size-24 overflow-hidden rounded-xl">
                  <img
                    src={item.prodImg}
                    alt={item.prodName}
                    className="Image size-32 object-cover"
                  />
                </div>
                <div className="w-full flex justify-between items-center p-4">
                  <div>
                    <p className="text-sm md:text-base xl:text-xl">
                      {item.prodName}
                    </p>
                    <p className="text-sm md:text-base xl:text-lg text-gray-700 font-medium">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm md:text-base xl:text-lg text-right">
                      PHP {item.prodPrice * item.quantity}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base xl:text-lg text-right text-gray-700 font-medium">
                      {item.prodPrice} each
                    </p>
                  </div>
                </div>
              </div>
              <div className="OrderItemInfo flex gap-2 flex-col pt-4 w-full">
                <div className="OrderItemButtom flex flex-wrap items-end gap-2">
                  <div className="flex flex-col sm:flex-row w-full gap-3">
                    <div className="OrderItemProductLocation grow sm:basis-1/2 md:basis-1/5 w-full flex">
                      <select
                        value={item.meetupLoc || deliveryLocationOptions[0]} // Default to an empty string if undefined
                        className="w-full border-[1px] border-black rounded-2xl px-4 font-medium text-sm md:text-base md:py-1 md:rounded-full xl:text-lg xl:py-2"
                        onChange={(e) =>
                          handleCheckoutProdChange(
                            item.order_id!,
                            "meetupLoc",
                            e.target.value
                          )
                        }
                      >
                        {deliveryLocationOptions.map((option, index) => (
                          <option
                            key={index}
                            value={option}
                            className="font-medium"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="OrderItemDeliveryTime grow sm:basis-1/2 md:basis-1/5 w-full flex">
                      <input
                        type="time"
                        value={item.meetupTime || ""}
                        onChange={(e) =>
                          handleCheckoutProdChange(
                            item.order_id!,
                            "meetupTime",
                            e.target.value
                          )
                        }
                        className="w-full border-[1px] border-black rounded-2xl px-4 font-medium text-sm md:text-base md:py-1 md:rounded-full xl:text-lg xl:py-2"
                      />
                    </div>
                  </div>
                  <div className="OrderItemDeliveryDate grow sm:basis-1/2 md:basis-1/5">
                    <input
                      type="date"
                      value={item.meetupDate || ""} // Ensure a default value of an empty string
                      onChange={(e) =>
                        handleCheckoutProdChange(
                          item.order_id!,
                          "meetupDate",
                          e.target.value
                        )
                      }
                      className="w-full border-[1px] border-black rounded-2xl px-4 sm:w-full font-medium text-sm md:text-base md:py-1 md:rounded-full xl:text-lg xl:py-2"
                    />
                  </div>
                </div>
                <div className="OrderPaymentMethod grow sm:basis-1/2 md:basis-1/5">
                  <select
                    value={
                      item.paymentMethod ||
                      sellerPayments[item.sellerId]?.[0]?.paymentMethod ||
                      ""
                    }
                    onChange={(e) =>
                      handleCheckoutProdChange(
                        item.order_id!,
                        "paymentMethod",
                        e.target.value
                      )
                    }
                    className="w-full border-[1px] border-black rounded-2xl px-4 font-medium text-sm md:text-base md:py-1 md:rounded-full xl:text-lg xl:py-2"
                  >
                    {(sellerPayments[item.sellerId] || []).map(
                      (
                        option: {
                          paymentMethod: string;
                          paymentNumber: string;
                        },
                        index: number
                      ) => (
                        <option
                          key={index}
                          value={option.paymentMethod}
                          className="font-medium"
                        >
                          {option.paymentMethod}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="checkoutBottom flex flex-col sm:flex-row gap-3">
            <div className="CartPayment flex w-full">
              <div className="CartPaymentWindow flex w-full flex-col items-center shadow-lg rounded-xl p-8">
                <div className="CartPaymentInfo w-full">
                  <h1 className="text-lg pb-4">Payment Summary</h1>
                  <div className="PaymentTransactionId"></div>
                  <div className="PaymentOrderSummary">
                    <p className="text-sm font-medium">Sub Total</p>
                    <h1 className="pb-4 text-2xl">{subTotal}</h1>
                  </div>
                  <div className="PaymentShippingFee">
                    <p className="text-sm font-medium">Tax</p>
                    <h1 className="pb-4 text-2xl">{tax}</h1>
                  </div>
                  <div className="PaymentTotal bg-gradient-to-r from-[#282667] to-slate-900 rounded-2xl text-white w-full flex flex-col align-center p-4 mb-4">
                    <p className="text-sm font-normal">Total Amount</p>
                    <h1 className="text-2xl font-semibold">{totalAmount}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="PaymentInfo flex flex-col lg:flex-col w-full mx-1">
              <div className="PaymentInfoBody shadow-2xl flex flex-col items-stretch sm:w-full rounded-xl p-8">
                <p className="border-b-2 border-gray-400 pb-4">Payment Info</p>
                {userPayment.map((payment) => (
                  <div className="PaymentInfoItem pt-4">
                    <p className="PaymentMethod">{payment.paymentMethod}</p>
                    <p className="PaymentInfo border-[1px] border-black p-2 rounded-xl mb-2 font-medium">
                      {payment.paymentNumber}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="PaymentInfoButton ">
            <button
              className="PlaceOrderButton bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 rounded-2xl text-white text-center w-full"
              onClick={handleSubmit}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
