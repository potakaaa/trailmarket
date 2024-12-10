import { useAuthContext } from "./context/AuthContext";
import { supabase } from "../createClient";
import Product from "./Product";
import { useState, useEffect } from "react";
import { Product as ProductType } from "./context/Globals";

const placeholder = "https://via.placeholder.com/150";
const SellerPage = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id) {
        console.error("User ID is not defined");
        return;
      }

      const { data, error } = await supabase
        .from("DIM_PRODUCT")
        .select(
          `
          PRODUCT_ID,
          PROD_NAME,
          PROD_PRICE,
          PROD_CONDITION,
          PROD_CATEGORY,
          PROD_STOCKS,
          PROD_DESC,
          SELLER_ID,
          CATEGORY:PROD_CATEGORY (CATEGORY_NAME)
        `
        )
        .eq("SELLER_ID", user.id)
        .order("PRODUCT_ID", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error.message);
        return;
      }

      console.log("Fetched products:", data);

      const formattedData = data.map((item) => ({
        id: item.PRODUCT_ID,
        name: item.PROD_NAME,
        price: item.PROD_PRICE,
        condition: item.PROD_CONDITION,
        category: item.PROD_CATEGORY,
        stocks: item.PROD_STOCKS,
        description: item.PROD_DESC,
        sellerId: item.SELLER_ID,
        categoryName: item.CATEGORY[0]?.CATEGORY_NAME,
        stock: item.PROD_STOCKS, // Assuming stock is the same as stocks
        imageUrl: placeholder, // Placeholder image URL
      }));

      setProducts(formattedData);
    };

    fetchProducts();
  }, [user]);

  return (
    <div className="app-wrapper flex flex-col items-center justify-center min-h-screen overflow-y-auto ">
      <div className="seller-page p-6 flex flex-col flex-1 h-full w-full rounded-xl overflow-hidden">
        <div className="top-seller-page md:flex-row border flex flex-[5] flex-col rounded-xl p-4 border-gray-300">
          <div className="flex flex-1  rounded-tr-xl rounded-tl-xl p-6 flex-col">
            <div className="nameandpic flex flex-row ">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-black">
                <img
                  className="object-cover h-full w-full"
                  src={user?.image}
                ></img>
              </div>
              <div className="flex flex-col ml-4">
                <p className=" font-normal text-sm">Seller Dashboard</p>
                <h1 className=" text-2xl">{user?.name}</h1>
              </div>
            </div>

            <div className="details mt-6 flex flex-col space-y-4">
              <form className="flex flex-col md: space-y-4">
                <div className="flex flex-row items-center">
                  <label className=" font-normal w-32">Name</label>
                  <input
                    id="name"
                    className="flex-1 rounded-xl border-2 border-black p-1"
                    type="text"
                    value={user?.name}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className="font-normal w-32">Contact No</label>
                  <input
                    id="contact"
                    className="flex-1 rounded-xl border-2 border-black p-1"
                    type="text"
                    value={user?.contact_num}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label className=" font-normal w-32">Email Address</label>
                  <input
                    id="email"
                    className="flex-1 rounded-xl border-2 border-black p-1"
                    type="email"
                    value={user?.email}
                  />
                </div>
              </form>

              <div className="Payment-options flex flex-row items-center align-start  flex-1 w-full">
                <div className="w-32 flex align-top ">
                  <label className=" font-normal w-32">Payment Options</label>
                </div>
                <div className="flex flex-col space-y-4 flex-grow-0  w-full">
                  <div className="flex flex-row w-full ">
                    <div className="flex-[1] flex rounded-tl-xl rounded-bl-xl border-black border-2"></div>
                    <input
                      id="PaymentOption1"
                      className="flex-[5] flex rounded-tr-xl rounded-br-xl border-2 border-black p-1    "
                    />
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex-[1] flex rounded-tl-xl rounded-bl-xl border-2 border-black"></div>
                    <input
                      id="PaymentOption2"
                      className="flex-[5] flex rounded-tr-xl rounded-br-xl p-1  border-black border-2   "
                    />
                  </div>
                  <div className="flex flex-row w-full ">
                    <div className="flex-[1] flex rounded-tl-xl rounded-bl-xl border-2 border-black  "></div>
                    <input
                      id="PaymentOption3"
                      className="flex-[5] flex rounded-tr-xl rounded-br-xl border-2 p-1  border-black "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 bg-gradient-to-t from-[#26245f] to-[#18181b] rounded-xl flex-col pt-24 p-7 space-y-6">
            <h2 className="text-white font-normal text-xs">Quick stat</h2>
            <div>
              <h1 className="text-white text-3xl">PHP 100000</h1>
              <h2 className="text-white font-normal text-xs">Total Sales</h2>
            </div>

            <div className="flex flex-row space-x-9">
              <div className="flex flex-col">
                <h1 className="text-white text-3xl">245</h1>
                <h2 className="text-white font-normal text-xs">Total Orders</h2>
              </div>

              <div className="flex flex-col">
                <h1 className="text-white text-3xl">245</h1>
                <h2 className="text-white font-normal text-xs">On Delivery</h2>
              </div>

              <div className="flex flex-col">
                <h1 className="text-white text-3xl">{products.length}</h1>
                <h2 className="text-white font-normal text-xs">Products</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="bot-seller-page flex flex-[2]   flex-col rounded-xl">
          <div className="products container flex flex-1 p-3 flex-col space-y-3 md:flex-row">
            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
