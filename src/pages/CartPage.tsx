import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";
import { CartProd, Tax, useAuthContext } from "./context/AuthContext";
import { TrashIcon } from "@heroicons/react/16/solid";
import { BiTrash } from "react-icons/bi";

const CartPage = () => {
  const nav = useNavigate();

  const cartItems = [
    {
      cartItemId: 1,
      cartItemImage:
        "https://www.kalkstore.com/cdn/shop/articles/KL_WEB_BLOG_PORTADA_4420x2400_df689793-0c08-4d64-8872-7b415597a5ac.jpg?v=1654701916&width=700",
      buyerName: "userAlpha4",
      productName: "Big K Sling Chainbag",
      unitPrice: 100,
      quantity: 4,
    },
    {
      cartItemId: 2,
      cartItemImage:
        "https://media.karousell.com/media/photos/products/2024/9/9/macbook_air_2018_13inch_core_i_1725901665_e2991c14_progressive.jpg",
      buyerName: "grandnationalExperimental",
      productName: "Apple MacBook M1",
      unitPrice: 40000,
      quantity: 1,
    },
    {
      cartItemId: 3,
      cartItemImage:
        "https://img.ltwebstatic.com/images3_spmp/2023/05/19/1684480567b4c168018d222c224b27ece30b2d14f8_thumbnail_720x.jpg",
      buyerName: "userAlpha4",
      productName: "Some Colorful Notebooks",
      unitPrice: 200,
      quantity: 1,
    },
  ];

  const [cartItemsState] = useState(cartItems);
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const {
    cart,
    setCart,
    user,
    setIsLoading,
    totalAmount,
    setTotalAmount,
    setTaxes,
    taxes,
  } = useAuthContext();

  const handleDelete = async (prod_id: number) => {
    const { error: deleteError } = await supabase
      .from("FACT_CART_PROD")
      .delete()
      .eq("PRODUCT_FK", prod_id);

    if (deleteError) {
      console.error("Error deleting cart item:", deleteError.message);
      alert("An error occurred while deleting the item.");
      return;
    }
    alert("Item deleted successfully!");
    getOrders();
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
    console.log("TAX", tempTax);
    if (tempTax?.amount) {
      setTax((tempTax?.amount / 100) * subTotal);
      console.log("TOTAL", subTotal + tempTax?.amount);
      setTotalAmount(subTotal + (tempTax?.amount / 100) * subTotal);
    }
  };

  const calculateSubTotal = () => {
    const tempSubTotal = cart.reduce((sum: number, item: any) => {
      return sum + item?.price * item?.quantity;
    }, 0);

    console.log(tempSubTotal);
    setSubTotal(tempSubTotal);
  };

  const getOrders = async () => {
    setIsLoading(true);
    const { data: cartData, error: cartError } = await supabase
      .from("DIM_CART")
      .select(
        `
    CART_ID,
    CART_USER,
    FACT_CART_PROD(
      PRODUCT_FK,
      CART_QUANTITY,
       DIM_PRODUCT (
        PROD_NAME,
        PROD_PRICE,
        PROD_CONDITION,
        PROD_CATEGORY,
         DIM_PRODUCTIMAGES (
         PRODUCT_IMAGE,
         isMainImage
          ),
        DIM_USER (
          USER_NAME
        )
      )
    )
  `
      )
      .eq("CART_USER", user?.id);

    console.log(cartData);
    if (cartError) {
      console.error("Error fetching :", cartError.message);
      setIsLoading(false);
      return [];
    }

    if (cartData && cartData.length > 0) {
      const tempData: any = cartData[0].FACT_CART_PROD;
      const tempCart: CartProd[] = tempData.map(
        (cartItem: any, index: number) => {
          const productDets: any = tempData?.[index]?.DIM_PRODUCT;

          // Find the main image (isMainImage === true) from DIM_PRODUCTIMAGES
          const mainImage = productDets?.DIM_PRODUCTIMAGES?.find(
            (image: any) => image.isMainImage === true
          );

          return {
            prod_id: tempData[index].PRODUCT_FK,
            name: productDets?.PROD_NAME,
            price: productDets?.PROD_PRICE,
            condition: productDets?.PROD_CONDITION,
            category: productDets?.PROD_CATEGORY,
            seller: productDets?.DIM_USER?.USER_NAME,
            img: mainImage ? mainImage.PRODUCT_IMAGE : null, // Use the main image if found, otherwise null
            quantity: tempData[index].CART_QUANTITY,
          };
        }
      );

      console.log(tempCart);
      setCart(tempCart);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
    fetchTaxes();
  }, []);

  useEffect(() => {
    calculateSubTotal();
    calculateTax();
  }, [cart]);

  return (
    <div className="mb-5">
      <div className="CartHeader bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 mx-5 rounded-2xl 2xl:mx-8 text-white text-center">
        <p className="text-xl sm:text-3xl text-white text-center font-semibold">
          Shopping Cart
        </p>
      </div>
      <div className="CartBody flex flex-col lg:flex-row h-full m-5  min-h-screen">
        <div className="CartItemList flex flex-col items-stretch lg:w-2/3 sm:w-full gap-5 h-full">
          {cart.map((item) => (
            <div
              key={item?.prod_id}
              className="CartItem shadow-lg flex-1 h-full flex rounded-xl xl:max-h-[300px]"
            >
              <div className="CartItemImage w-[30%] overflow-hidden rounded-xl">
                <img
                  src={item?.img}
                  alt={item?.name}
                  className="Image w-full h-full object-cover"
                />
              </div>
              <div className="CartItemInfo m-6 flex gap-2 flex-col w-[70%]">
                <div className="CartItemTop">
                  <div className="CartItemSeller flex items-center w-full">
                    <div className="CartItemSellerImage bg-gray-700 size-3 mr-2 rounded-full"></div>
                    <p className="CartItemSellerName text-xs font-medium">
                      {item?.seller}
                    </p>
                    <div className="flex justify-end flex-grow">
                      <button
                        className="flex justify-end self-end items-end p-2 hover:rounded-full hover:shadow-md bg-transparent transition-all duration-300"
                        onClick={() => handleDelete(item?.prod_id)}
                      >
                        <BiTrash className="size-6 text-red-600 shadow-sm bg-transparent" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="CartItemMiddle">
                  <h1 className="text-2xl border-b-2 border-gray-400 pb-4">
                    {item?.name}
                  </h1>
                  <div className="CartItemsPriceConfig flex pt-[15px] justify-between">
                    <div className="CartItemsUnitPrice w-1/3">
                      <p className="text-sm font-medium">Unit Price</p>
                      <h1 className="text-2xl">{item?.price}</h1>
                    </div>
                    <div className="CartItemsQuantity w-1/3">
                      <p className="text-sm font-medium">Quantity</p>
                      <div className="CartItemsQuantityEdit">
                        <input
                          type="number"
                          value={item?.quantity}
                          min="1"
                          readOnly
                          onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                          }}
                          className="w-1/2 border-[2px] border-black rounded-2xl px-4 text-center"
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                    <div className="CartItemsTotalPrice w-1/3">
                      <p className="text-sm font-medium">Total Price</p>
                      <h1 className="text-2xl">
                        {item?.price * item?.quantity}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="CartPayment lg:w-1/3 sm:w-full">
          <div className="CartPaymentWindow flex flex-col items-center shadow-lg m-5 rounded-xl p-8">
            <div className="CartPaymentInfo w-full">
              <h1 className="text-2xl pb-4">Payment Summary</h1>
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
            <div className="PaymentButton w-full">
              <button
                className="bg-gradient-to-r from-[#282667] to-slate-900 p-2 sm:p-4 rounded-2xl text-white text-center w-full text-base hover:text-lg hover:shadow-lg xl:text-lg xl:hover:text-xl transition-all duration-300"
                onClick={() => nav("/checkout")}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
