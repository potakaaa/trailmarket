import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";
import {
  CartProd,
  CheckoutProd,
  Tax,
  useAuthContext,
} from "./context/AuthContext";
import { BiTrash } from "react-icons/bi";

const CartPage = () => {
  const nav = useNavigate();

  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);

  console.log(tax);

  const {
    cart,
    setCart,
    user,
    setIsLoading,
    totalAmount,
    setTotalAmount,
    setTaxes,
    taxes,
    setCheckoutProds,
    checkoutProds,
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
      setTax(Math.round((tempTax?.amount / 100) * subTotal));
      console.log("TOTAL", subTotal + tempTax?.amount);
      setTotalAmount(Math.round(subTotal + (tempTax?.amount / 100) * subTotal));
    }
  };

  const calculateSubTotal = () => {
    const tempSubTotal = cart.reduce((sum: number, item: any) => {
      return sum + item?.price * item?.quantity;
    }, 0);

    console.log(tempSubTotal);
    setSubTotal(tempSubTotal);
  };

  const handleCheckout = () => {
    const tempCheckoutProd: CheckoutProd[] = cart.map((item) => {
      return {
        order_id: undefined,
        prod_fk: item?.prod_id,
        meetupLoc: undefined,
        meetupDate: undefined,
        meetupTime: undefined,
        quantity: item?.quantity,
        prodName: item?.name,
        prodPrice: item?.price,
        prodImg: item?.img,
        paymentMethod: undefined,
        paymentDate: undefined,
        paymentStatus: undefined,
        sellerId: item.seller_id,
      };
    });
    setCheckoutProds(tempCheckoutProd);
    nav("/checkout");
    console.log(checkoutProds);
  };

  console.log(handleCheckout);

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
        SELLER_ID,
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
            seller_id: productDets?.SELLER_ID,
            img: mainImage ? mainImage.PRODUCT_IMAGE : null, // Use the main image if found, otherwise null
            quantity: tempData[index].CART_QUANTITY,
          };
          console.log(cartItem);
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
    <div className="px-5 pb-5">
      <div className="CartHeader bg-gradient-to-r from-[#282667] to-slate-900 p-4 rounded-2xl 2xl:mx-8 text-white text-center">
        <p className="text-xl sm:text-3xl text-white text-center font-semibold">
          Shopping Cart
        </p>
      </div>
      <div className="CartBody flex flex-col h-full my-5">
        <div className="CartItemList flex flex-col xl:grid xl:grid-cols-1 2xl:grid-cols-2 gap-5">
          {cart.map((item) => (
            <button
              key={item?.prod_id}
              className="CartItem shadow-[0_0px_20px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col md:flex-row items-stretch"
              onClick={() => nav(`/product/${item?.prod_id}`)}
            >
              <div className="md:w-3/4 w-full h-full flex-1 flex flex-col">
                <img
                  src={item?.img}
                  alt={item?.name}
                  className="Image flex-1 rounded-2xl object-cover max-h-[250px] min-h-[250px]"
                />
              </div>
              <div className="CartItemInfo p-6 flex flex-col md:w-3/4 w-full justify-center">
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
                <div className="CartItemMiddle my-2">
                  <h1 className="text-2xl border-b-2 border-gray-400 pb-4 md:text-left sm:text-center">
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
                            console.log(quantity);
                          }}
                          className="w-2/3 border-[2px] border-black rounded-2xl text-center"
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                    <div className="CartItemsTotalPrice w-1/3">
                      <p className="text-sm font-medium">Total Price</p>
                      <h1 className="text-2xl">{totalAmount}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
