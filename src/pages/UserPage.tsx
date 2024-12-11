import { useAuthContext } from "./context/AuthContext";
import { supabase } from "../createClient";
import Product from "./Product";
import { useState, useEffect, useCallback } from "react";
import { Product as ProductType } from "./context/Globals";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

type User = {
  id: string;
  name: string;
  age: number | null;
  contact_num: number | null;
  email: string;
  facebook: string | null;
  image: string | "https://via.placeholder.com/150";
};

const placeholder = "https://via.placeholder.com/150";
const UserPage = () => {
  const { user } = useAuthContext();
  const { userId } = useParams<{ userId: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageOwner, setPageOwner] = useState<User | null>(null);
  type PaymentMethod = {
    id: string;
    method: string;
    account: string;
  };

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    method: "",
    account: "",
  });

  const [formValues, setFormValues] = useState({
    name: pageOwner?.name || "",
    age: pageOwner?.age || "",
    contact_num: pageOwner?.contact_num || "",
    email: pageOwner?.email || "",
    facebook: pageOwner?.facebook || "",
    image: pageOwner?.image || placeholder,
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase
        .from("DIM_USER")
        .select("*")
        .eq("STUDENT_ID", userId)
        .single();

      if (error) {
        console.error("Error fetching user details:", error.message);
        return;
      }

      const formattedData = {
        id: data.STUDENT_ID,
        name: data.USER_NAME,
        age: data.USER_AGE,
        contact_num: data.USER_CONTACTNUM,
        email: data.USER_EMAIL,
        facebook: data.USER_FB,
        image: data.USER_IMAGE ?? placeholder,
      };

      setPageOwner(formattedData);
      setFormValues(formattedData);
    };

    const fetchProducts = async () => {
      if (!userId) {
        console.error("userId is undefined");
        return;
      }
      const { data, error } = await supabase
        .from("DIM_PRODUCT")
        .select("*, DIM_CATEGORY(CATEGORY_NAME)")
        .eq("SELLER_ID", userId)
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
        categoryName: item.DIM_CATEGORY?.CATEGOTY_NAME,
        stock: item.PROD_STOCKS,
        imageUrl: placeholder,
      }));

      setProducts(formattedData);
    };

    const fetchPaymentMethods = async () => {
      if (!userId) {
        console.error("No userId provided");
        return;
      }

      const { data, error } = await supabase
        .from("DIM_PAYMENTMETHOD")
        .select("*")
        .eq("USER_PAY_FK", userId);

      if (error) {
        console.error("Error fetching payment methods:", error.message);
        return;
      }

      console.log("Fetched payment methods:", data);

      const formattedData = data.map((item) => ({
        id: item.PAYMENTMETHOD_ID,
        method: item.PAYMENT_METHOD,
        account: item.ACCOUNT_NUMBER,
      }));
      setPaymentMethods(formattedData);
    };

    fetchUserDetails();
    fetchProducts();
    fetchPaymentMethods();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAddPaymentMethod = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!newPaymentMethod.method || !newPaymentMethod.account) {
      alert("Please fill in both fields.");
      return;
    }

    const { data, error } = await supabase
      .from("PAYMENT_METHODS")
      .insert([
        {
          USER_PAY_FK: userId,
          PAYMENT_METHOD: newPaymentMethod.method,
          ACCOUNT_NUMBER: newPaymentMethod.account,
        },
      ])
      .select("PAYMENTMETHOD_ID");

    if (error) {
      console.error("Error adding payment method:", error.message);
      return;
    }

    if (data) {
      setPaymentMethods((prev) => [
        ...prev,
        {
          id: data[0].PAYMENTMETHOD_ID,
          method: newPaymentMethod.method,
          account: newPaymentMethod.account,
        },
      ]);
    }
    setNewPaymentMethod({ method: "", account: "" });
  };

  const isOwner = String(user?.id) === String(userId);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormValues((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    noClick: !isEditing,
    noDrag: !isEditing,
  });

  return (
    <div className="app-wrapper flex flex-col items-center justify-center min-h-screen overflow-y-auto ">
      <div className="seller-page p-6 flex flex-col flex-1 h-full w-full rounded-xl overflow-hidden">
        <div className="top-seller-page md:flex-row border flex flex-[5] flex-col rounded-xl p-4 border-gray-300">
          <div className="flex flex-1  rounded-tr-xl rounded-tl-xl p-6 flex-col">
            <div className="bigcontain flex flex-col ">
              <div className="flex flex-row">
                <div
                  className={`${
                    isEditing ? "w-24 h-24" : "w-12 h-12"
                  } rounded-full overflow-hidden border border-black`}
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      className="object-cover h-full w-full"
                      src={formValues.image || placeholder}
                      alt="Profile"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-4">
                  <p className=" font-normal text-sm">Seller Dashboard</p>
                  <h1 className=" text-2xl">{pageOwner?.name}</h1>
                </div>
              </div>
              {isEditing && (
                <p className="text-wrap text-xs w-24">
                  Drop image here, or click to select
                </p>
              )}
              <div className="details mt-6 flex flex-col space-y-4">
                <form className="flex flex-col md: space-y-4">
                  <div className="flex flex-row items-center">
                    <label className=" font-normal w-32">Name</label>
                    <input
                      id="name"
                      className="flex-1 rounded-xl border-2 border-black p-1"
                      type="text"
                      value={formValues.name}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label className=" font-normal w-32">Age</label>
                    <input
                      id="age"
                      className="flex-1 rounded-xl border-2 border-black p-1"
                      type="number"
                      value={formValues.age ?? ""}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          age: Number(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="flex flex-row items-center">
                    <label className="font-normal w-32">Contact No</label>
                    <input
                      id="contact"
                      className="flex-1 rounded-xl border-2 border-black p-1"
                      type="text"
                      value={formValues.contact_num ?? ""}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          contact_num: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label className=" font-normal w-32">Email Address</label>
                    <input
                      id="email"
                      className="flex-1 rounded-xl border-2 border-black p-1"
                      type="email"
                      value={formValues.email}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label className=" font-normal w-32">Facebook</label>
                    <input
                      id="facebook"
                      className="flex-1 rounded-xl border-2 border-black p-1"
                      type="text"
                      value={formValues.facebook ?? ""}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          facebook: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <button type="submit"></button>
                </form>

                <div className="Payment-options flex flex-row items-center align-start  flex-1 w-full">
                  <div className="w-32 flex align-top ">
                    <label className=" font-normal w-32">Payment Options</label>
                  </div>

                  <div className="flex flex-col space-y-4 flex-grow-0 w-full">
                    {paymentMethods.length > 0 ? (
                      paymentMethods.map((option, index) => (
                        <div key={index} className="flex flex-row w-full mb-4">
                          <div className="flex-[1] flex rounded-tl-xl rounded-bl-xl border-black border-2 p-2 w-full bg-gray-100">
                            {option.method}
                          </div>
                          <input
                            id={`PaymentOption${index + 1}`}
                            className="flex-[5] flex rounded-tr-xl rounded-br-xl border-2 border-black p-1"
                            value={option.account}
                            readOnly
                          />
                        </div>
                      ))
                    ) : (
                      <p>No payment methods available.</p>
                    )}
                    {isOwner && isEditing && (
                      <form onSubmit={handleAddPaymentMethod}>
                        <div className="flex flex-row">
                          <input
                            type="text"
                            placeholder="Payment Method"
                            className="flex-[1] flex rounded-tl-xl text-xs rounded-bl-xl border-black border-2 p-2 w-full bg-gray-100"
                            value={newPaymentMethod.method}
                            onChange={(e) =>
                              setNewPaymentMethod((prev) => ({
                                ...prev,
                                method: e.target.value,
                              }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="Account Number"
                            className="flex-[5] flex rounded-tr-xl rounded-br-xl border-2 border-black p-1"
                            value={newPaymentMethod.account}
                            onChange={(e) =>
                              setNewPaymentMethod((prev) => ({
                                ...prev,
                                account: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-2 text-xs border-2 border-black bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl w-full"
                        >
                          Add Payment Method
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                {isOwner && (
                  <button
                    onClick={handleEdit}
                    className="px-3 py-2 text-xs border-2 border-black bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl w-full"
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                )}
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

export default UserPage;
