import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";
import Dropdown from "./DropDown";
import { fetchCategories, CategoryArray } from "./context/Globals";
import { useAuthContext } from "./context/AuthContext";
import TopNavBar from "./navbar/TopNavBar";
import NavBar from "./navbar/NavBar";

const placeholder = "https://via.placeholder.com/150";

const placeholderArr = Array(4).fill(placeholder);

const ProductPost = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    short_desc: "",
    price: "",
    stock: "",
    category: 0, // Store category ID as a number
    condition: "",
  });

  const { user } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setInput((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleCategorySelect = (selectedCategoryName: string) => {
    const selectedCategory = CategoryArray.find(
      (category) => category.CategoryName === selectedCategoryName
    );
    if (selectedCategory) {
      setInput((prevFormData) => ({
        ...prevFormData,
        category: selectedCategory.CategoryID,
      }));
    }
  };

  const handlePost = async () => {
    console.log("Submitting form with data:", input); // Debugging

    if (!input.name) {
      alert("Please enter a product name.");
      return;
    }

    if (input.category === 0) {
      alert("Please select a category.");
      return;
    }

    const { error: insertError } = await supabase.from("DIM_PRODUCT").insert([
      {
        PROD_NAME: input.name,
        PROD_PRICE: input.price,
        PROD_CONDITION: input.condition,
        PROD_STOCKS: input.stock,
        PROD_DESC: input.description,
        PROD_SHORTDESC: input.short_desc,
        SELLER_ID: user?.id,
        PROD_CATEGORY: input.category, // Ensure this is a number
      },
    ]);

    if (insertError) {
      alert("Error fetching data: " + insertError.message);
    } else {
      nav("/home");
    }
  };

  const options = CategoryArray.map((category) => category.CategoryName);

  return (
    <div className="app-wrapper bg-white flex flex-col items-center justify-center min-h-screen overflow-y-auto">
      <TopNavBar />
      <NavBar obj={CategoryArray} />
      <div className="post-page p-6 flex flex-col flex-1 h-full w-full rounded-xl">
        <div className="justify-center align-center flex bg-gradient-to-r from-[#26245f] to-[#18181b] text-white rounded-xl p-4">
          <h1 className="text-xl">Post a Product</h1>
        </div>
        <div className="main-app flex w-full flex-col justify-center space-y-2 lg:flex-row space-x-2">
          <div className="left flex w-full h-full flex-col space-y-4">
            <div className="gen-info flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <h1 className="text-xl">General Information</h1>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name">Name of Product</label>
                  <input
                    id="name"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                    type="text"
                    placeholder="Make the product name stand out!"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description">Full Description</label>
                  <textarea
                    id="description"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500 min-h-56 max-h-96 resize-y text-wrap"
                    placeholder="Enter the full description"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="short_desc">Short Description</label>
                  <input
                    id="short_desc"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                    type="text"
                    placeholder="Be concise, but poignant"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="pricing-stock flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <h1 className="text-xl">Details</h1>
              <form className="flex flex-row space-x-2">
                <div className="flex flex-col">
                  <label className="">Base Pricing</label>
                  <input
                    id="price"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500 w-full"
                    type="number"
                    placeholder="Input a number"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="">Stock</label>
                  <input
                    id="stock"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500  w-full"
                    type="number"
                    placeholder="Input a number"
                    onChange={handleChange}
                  />
                </div>
              </form>
              <div className="flex flex-col">
                <h1>Category</h1>
                <div className=" category-container flex flex-col space gap-x-2 space-y-3 md:flex-row justify-start items-start">
                  <div className=" flex-col md:flex-row flex space-y-2 md:space-x-2">
                    <Dropdown
                      buttonStyle="px-6 py-1 bg-white border-2 border-black rounded-xl h-full"
                      optionStyle="absolute mb-1 left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                      onSelect={handleCategorySelect}
                      options={options}
                    ></Dropdown>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h1>Condition</h1>
                <div className=" category-container flex flex-col space gap-x-2 space-y-3 md:flex-row justify-start items-start">
                  <div className=" flex-col md:flex-row flex space-y-2 md:space-x-2">
                    <form className="flex flex-row space-x-2 mt-0 justify-center items-center h-full">
                      <div className="flex flex-col items-center">
                        <input
                          id="condition"
                          className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                          type="text"
                          placeholder="Set Condition"
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right space-y-4 h-full flex flex-col md:flex-[1]">
            <div className="flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <div className="product-display flex-[3] flex flex-col rounded-2xl 2xl:flex-[3] xl:m-4">
                <div className="aspect-square bg-gray-200 rounded-lg shadow-md sm:m-4 md:m-2">
                  <img
                    className="h-full w- object-cover rounded-lg"
                    src={placeholder}
                    alt="Product"
                  />
                </div>
                <div className="gallery grid grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-4 p-2 w-full sm:px-5 md:p-2">
                  {placeholderArr.map((placeholder, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-lg border aspect-square shadow-sm"
                    >
                      <img
                        className="h-full w-full object-cover rounded-lg"
                        src={placeholder}
                        alt="Product"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="uplaod">
                <input type="file" name="file" id="file" />
              </div>
            </div>
            <div className="disclaimer flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <p>
                By posting a product, you confirm ownership and the right to
                sell it. You agree to provide accurate descriptions and ensure
                the product complies with all laws. The platform may remove
                listings that violate these terms.
              </p>
            </div>
            <button
              onClick={handlePost}
              className="bg-gradient-to-r from-[#26245f] to-[#18181b] text-white font-normal rounded-full w-full h-10 mt-3 self-end shadow-md"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
