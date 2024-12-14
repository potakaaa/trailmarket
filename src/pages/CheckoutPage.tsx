import { useEffect, useState } from "react";
import { Tax, useAuthContext, UserPayment } from "./context/AuthContext";
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
  } = useAuthContext();

  const [sellerPayments, setSellerPayments] = useState<any>([
    "Cash on Delivery",
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const loc = useLocation();
  const nav = useNavigate();
  

 const [orderDetails, setOrderDetails] = useState<
   {
     orderId: number;
     meetupLoc: string;
     meetupTime: string;
     meetupDate: string;
     paymentMethod: string;
   }[]
 >([]);

 const handleInputChange = (orderId: number, field: string, value: string) => {
   setOrderDetails((prev) =>
     prev.map(
       (order) =>
         order.orderId === orderId
           ? { ...order, [field]: value } // Update only the specified field
           : order // Keep other orders unchanged
     )
   );
 };
 const deliveryLocationOptions = [
   "CITC",
   "CEA",
   "Study Shed 2",
   "Study Shed 1",
   "CSM",
   "Gym Lobby",
   "Old CSM",
 ];

 const fetchSellerPaymentMethods = async () => {
   try {
     const sellerIds = [...new Set(checkoutProds.map((prod) => prod.sellerId))];

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

 useEffect(() => {
   const initialOrderDetails = checkoutProds.map((item) => ({
     orderId: item.order_id || 0, // Default to 0 if undefined
     meetupLoc: item.meetupLoc || "", // Default empty string for location
     meetupTime: item.meetupTime || "", // Default empty string for time
     meetupDate: item.meetupDate || "", // Default empty string for date
     paymentMethod: item.paymentMethod || "", // Default empty string for payment method
     prodImg: item.prodImg,
     prodName: item.prodName,
     prodPrice: item.prodPrice,
     quantity: item.quantity,
     sellerId: item.sellerId,
   }));
   setOrderDetails(initialOrderDetails);
 }, [checkoutProds]);

 const calculateTax = () => {
   const tempTax = taxes.find(
     (tax) => subTotal >= tax.low && subTotal <= tax.high
   );
   console.log("TAX", tempTax);
   if (tempTax?.amount) {
     setTax((tempTax?.amount / 100) * subTotal);
     console.log("TOTAL", subTotal + tempTax?.amount);
     setTotalAmount(Math.round(subTotal + (tempTax?.amount / 100) * subTotal));
   }
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
                       value={
                         orderDetails.find(
                           (order) => order.orderId === item.order_id
                         )?.meetupLoc || ""
                       }
                       className="w-full border-[1px] border-black rounded-2xl px-4 font-medium text-sm md:text-base md:py-1 md:rounded-full xl:text-lg xl:py-2"
                       onChange={(e) =>
                         item.order_id !== undefined &&
                         handleInputChange(
                           item.order_id ?? 0,
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
                       value={
                         orderDetails.find(
                           (order) => order.orderId === item.order_id
                         )?.meetupTime || ""
                       }
                       onChange={(e) =>
                         handleInputChange(
                           item.order_id ?? 0,
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
                     onChange={(e) =>
                       handleInputChange(
                         item.order_id ?? 0,
                         "meetupDate",
                         e.target.value
                       )
                     }
                     value={
                       orderDetails.find(
                         (order) => order.orderId === item.order_id
                       )?.meetupDate || ""
                     }
                     className="w-full border-[1px]  border-black rounded-2xl px-4 sm:w-full font-medium text-sm md:text-base md:py-1 md:rounded-full xl:text-lg xl:py-2"
                   />
                 </div>
               </div>
               <div className="OrderPaymentMethod grow sm:basis-1/2 md:basis-1/5">
                 <select
                   onChange={(e) =>
                     item.order_id !== undefined &&
                     handleInputChange(
                       item.order_id,
                       "paymentMethod",
                       e.target.value
                     )
                   }
                   value={item.paymentMethod}
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
             onClick={() => nav("/purchaseHistory")}
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
