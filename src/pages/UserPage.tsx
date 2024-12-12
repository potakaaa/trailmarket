import { useAuthContext } from "./context/AuthContext";
import { supabase } from "../createClient";
import Product from "./Product";
import { useState, useEffect, useCallback } from "react";
import { Product as ProductType } from "./context/Globals";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

type User = {
  id: string;
  name: string;
  age: number | null;
  contact_num: number | null;
  email: string;
  facebook: string | null;
  image: string | "https://via.placeholder.com/150";
  isEditing?: boolean;
};

const placeholder = "https://via.placeholder.com/150";
const UserPage = () => {
  const { user, setIsLoading } = useAuthContext();
  const { userId } = useParams<{ userId: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageOwner, setPageOwner] = useState<User | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  type PaymentMethod = {
    id: string;
    method: string;
    account: string;
    isEditing?: boolean;
  };

  const [allPaymentMethods, setAllPaymentMethods] = useState<
    (PaymentMethod & { status: "new" | "modified" | "saved" | "deleted" })[]
  >([]);
  const [tempPaymentMethods, setTempPaymentMethods] = useState<
    (PaymentMethod & { status: "new" | "modified" | "saved" | "deleted" })[]
  >([]);
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
  const [tempFormValues, setTempFormValues] = useState({ ...formValues });

  const handleAddPaymentMethod = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Validate the input fields
    if (!newPaymentMethod.method.trim() || !newPaymentMethod.account.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    // Create a new payment method object without an ID
    const newMethod: PaymentMethod & {
      status: "new" | "modified" | "saved" | "deleted";
    } = {
      id: "", // Temporary empty ID
      method: newPaymentMethod.method.trim(),
      account: newPaymentMethod.account.trim(),
      status: "new", // Mark as new
    };

    // Update the temporary payment methods
    setTempPaymentMethods((prev) => [...prev, newMethod]);

    // Reset the input fields
    setNewPaymentMethod({ method: "", account: "" });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempPaymentMethods([...allPaymentMethods]);
    setTempFormValues({ ...formValues });
  };

  const handleEditPaymentMethod = (id: string) => {
    setTempPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, isEditing: !method.isEditing } : method
      )
    );
  };

  const handleEditPaymentMethodField = (
    id: string,
    field: keyof PaymentMethod,
    value: string
  ) => {
    setTempPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, [field]: value } : method
      )
    );
  };

  const handleSavePaymentMethod = (id: string) => {
    setTempPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id
          ? { ...method, isEditing: false, status: "modified" }
          : method
      )
    );
  };

  const handleDeletePaymentMethod = (id: string) => {
    setTempPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, status: "deleted" } : method
      )
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    const folderPath = "users";
    try {
      let newImageUrl = tempFormValues.image;

      // Upload the image if a new file is present
      if (imageFile) {
        const uniqueName = `${folderPath}/${uuidv4()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("trailmarket-images")
          .upload(uniqueName, imageFile);

        if (uploadError) {
          console.error("Error uploading image:", uploadError.message);
          return;
        }

        newImageUrl = supabase.storage
          .from("trailmarket-images")
          .getPublicUrl(uniqueName).data.publicUrl;
      }

      const oldImageUrl = formValues.image;

      // Update user details
      if (!pageOwner) {
        console.error("Page owner is null");
        return;
      }

      const { error: userError } = await supabase
        .from("DIM_USER")
        .update({
          USER_NAME: tempFormValues.name,
          USER_AGE: tempFormValues.age,
          USER_CONTACTNUM: tempFormValues.contact_num,
          USER_EMAIL: tempFormValues.email,
          USER_FB: tempFormValues.facebook,
          USER_IMAGE: newImageUrl,
        })
        .eq("STUDENT_ID", pageOwner.id);

      if (userError) {
        console.error("Error updating user details:", userError.message);
        return;
      }
      if (oldImageUrl) {
        const filePath = new URL(oldImageUrl).pathname.replace(
          "/storage/v1/object/public/trailmarket-images/",
          ""
        );

        if (filePath) {
          try {
            const url = new URL(oldImageUrl);
            const filePath = url.pathname.replace(
              "/storage/v1/object/public/trailmarket-images/",
              ""
            );
            console.log("Deleting old image:", oldImageUrl);

            if (filePath) {
              const { error: deleteError } = await supabase.storage
                .from("trailmarket-images")
                .remove([filePath]);

              if (deleteError) {
                console.error("Error deleting old image:", deleteError.message);
                return;
              }
            }
          } catch (error) {
            if (error instanceof Error) {
              console.error("Invalid URL:", oldImageUrl, error.message);
            } else {
              console.error("Invalid URL:", oldImageUrl);
            }
            return;
          }
        }
      }
      const updatedMethods = tempPaymentMethods.filter(
        (method) => method.status !== "deleted"
      );
      const deletedMethods = tempPaymentMethods.filter(
        (method) => method.status === "deleted"
      );

      for (const method of updatedMethods) {
        const { data, error: methodError } = await supabase
          .from("DIM_PAYMENTMETHOD")
          .upsert({
            PAYMENTMETHOD_ID: method.status === "new" ? undefined : method.id,
            PAYMENT_METHOD: method.method,
            ACCOUNT_NUMBER: method.account,
            USER_PAY_FK: pageOwner.id,
          })
          .select();

        if (methodError) {
          console.error("Error updating payment method:", methodError.message);
          return;
        }

        // Update the method ID if it was newly inserted
        if (method.status === "new" && data && data.length > 0) {
          method.id = data[0].PAYMENTMETHOD_ID;
          method.status = "saved";
        }
      }

      for (const method of deletedMethods) {
        const { error: deleteError } = await supabase
          .from("DIM_PAYMENTMETHOD")
          .delete()
          .eq("PAYMENTMETHOD_ID", method.id);

        if (deleteError) {
          console.error("Error deleting payment method:", deleteError.message);
          return;
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setIsEditing(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setTempFormValues({ ...formValues });
    setTempPaymentMethods([...allPaymentMethods]);
    setIsEditing(false);
  };

  const isOwner = String(user?.id) === String(userId);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setTempFormValues((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    noClick: !isEditing,
    noDrag: !isEditing,
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
      setTempFormValues(formattedData);
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
        status: "saved" as const,
      }));
      setAllPaymentMethods(formattedData);
      setTempPaymentMethods(formattedData);
    };

    fetchUserDetails();
    fetchProducts();
    fetchPaymentMethods();
  }, [userId]);

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
                  <div {...getRootProps()} className="h-full w-full">
                    <input {...getInputProps()} />
                    <img
                      className="object-cover h-full w-full"
                      src={tempFormValues.image || placeholder}
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
                      value={tempFormValues.name}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setTempFormValues((prev) => ({
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
                      value={tempFormValues.age ?? ""}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setTempFormValues((prev) => ({
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
                      value={tempFormValues.contact_num ?? ""}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setTempFormValues((prev) => ({
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
                      value={tempFormValues.email}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setTempFormValues((prev) => ({
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
                      value={tempFormValues.facebook ?? ""}
                      readOnly={!isOwner || !isEditing}
                      onChange={(e) =>
                        setTempFormValues((prev) => ({
                          ...prev,
                          facebook: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <button type="submit"></button>
                </form>

                <div className="Payment-methods flex flex-row items-center align-start  flex-1 w-full">
                  <div className="w-32 flex align-top ">
                    <label className=" font-normal w-32">Payment Options</label>
                  </div>

                  <div className="flex flex-col space-y-4 flex-grow-0 w-full">
                    {tempPaymentMethods.map(
                      (method) =>
                        method.status !== "deleted" && (
                          <div
                            key={method.id}
                            className="flex flex-row items-center space-x-2"
                          >
                            <input
                              type="text"
                              value={method.method}
                              readOnly={!method.isEditing}
                              onChange={(e) =>
                                handleEditPaymentMethodField(
                                  method.id,
                                  "method",
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-xl border-2 border-black p-1"
                            />
                            <input
                              type="text"
                              value={method.account}
                              readOnly={!method.isEditing}
                              onChange={(e) =>
                                handleEditPaymentMethodField(
                                  method.id,
                                  "account",
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-xl border-2 border-black p-1"
                            />

                            {isEditing &&
                              (method.isEditing ? (
                                <button
                                  onClick={() =>
                                    handleSavePaymentMethod(method.id)
                                  }
                                  className="px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleEditPaymentMethod(method.id)
                                  }
                                  className="px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center"
                                >
                                  Edit
                                </button>
                              ))}

                            {isEditing && (
                              <button
                                onClick={() =>
                                  handleDeletePaymentMethod(method.id)
                                }
                                className="px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        )
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
                {isOwner &&
                  (isEditing ? (
                    <div className="flex flex-row">
                      <button
                        onClick={handleSave}
                        className="px-3 py-2 text-xs border-2 border-black bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl w-full"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 text-xs border-2 border-black bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="px-3 py-2 text-xs border-2 border-black bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl w-full"
                    >
                      Edit
                    </button>
                  ))}
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
