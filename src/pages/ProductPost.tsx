import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { supabase } from "../createClient";
import Dropdown from "./DropDown";
import { fetchCategories, CategoryArray } from "./context/Globals";
import { useAuthContext } from "./context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const placeholder = "https://via.placeholder.com/150";
const placeholderArr = Array(4).fill(placeholder);

const urlToFile = async (url: string, filename: string, mimeType: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};

const ProductPost = () => {
  const location = useLocation();
  const existingProduct = location.state?.product || null;
  const isEditMode = !!existingProduct;
  const [input, setInput] = useState({
    name: "",
    description: "",
    short_desc: "",
    price: "",
    stock: "",
    category: 0,
    condition: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { user } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    if (isEditMode && existingProduct) {
      // Pre-fill form fields with existing product data
      setInput({
        name: existingProduct.PROD_NAME || "",
        description: existingProduct.PROD_DESC || "",
        short_desc: existingProduct.PROD_SHORTDESC || "",
        price: existingProduct.PROD_PRICE || "",
        stock: existingProduct.PROD_STOCKS || "",
        category: existingProduct.PROD_CATEGORY || 0,
        condition: existingProduct.PROD_CONDITION || "",
      });

      setMainImage(existingProduct.mainImage || null);
      setGalleryImages(existingProduct.galleryImages || []);
    }
  }, [isEditMode, existingProduct]);

  useEffect(() => {
    if (existingProduct) {
      setMainImage(existingProduct.mainImage || null); // Set the main image
      setGalleryImages(existingProduct.images || []); // Set additional gallery images
    }
  }, [existingProduct]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Create a File object from the placeholder URL
    const createPlaceholderFile = async () => {
      const response = await fetch(placeholder);
      const blob = await response.blob();
      const file = new File([blob], "placeholder.jpg", { type: "image/jpeg" });
      setMainImage(file);
      setIsPlaceholder(true);
    };

    createPlaceholderFile();
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

  const handleDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    const invalidFiles = acceptedFiles.filter(
      (file) => !validImageTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      alert(
        "Invalid file type or size. Only JPEG, PNG, and GIF files under 10 MB are allowed."
      );
      return;
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...acceptedFiles];
      if (isPlaceholder) {
        setMainImage(acceptedFiles[0]);
        setIsPlaceholder(false);
      }
      return updatedImages;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    disabled: images.length >= 5,
  });

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

  const handleImageClick = (image: File) => {
    setMainImage(image);
    setIsPlaceholder(false);
  };

  useEffect(() => {
    setGalleryImages(images.filter((image) => image !== mainImage));
  }, [images, mainImage]);

  const removeGalleryImage = (image: File) => {
    setGalleryImages((prevGalleryImages) =>
      prevGalleryImages.filter((img) => img !== image)
    );
  };

  const uploadImages = async (imagesToUpload: File[]) => {
    const uploadedImageUrls = [];
    const folderPath = "products";

    for (const image of imagesToUpload) {
      const uniqueName = `${folderPath}/${uuidv4()}-${image.name}`;
      const { error } = await supabase.storage
        .from("trailmarket-images")
        .upload(uniqueName, image);

      if (error) {
        console.error("Error uploading image:", error.message);
        alert("Error uploading image:" + error.message);
        continue;
      }

      const { publicUrl } = supabase.storage
        .from("trailmarket-images")
        .getPublicUrl(uniqueName).data;

      uploadedImageUrls.push(publicUrl);
    }

    return uploadedImageUrls;
  };

  const handlePost = async () => {
    console.log("Submitting form with data:", input);

    if (!input.name) {
      alert("Please enter a product name.");
      return;
    }

    if (input.category === 0) {
      alert("Please select a category.");
      return;
    }

    if (input.price === "" || Number(input.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (input.stock === "" || Number(input.stock) <= 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    if (!input.condition) {
      alert("Please enter a product condition.");
      return;
    }

    if (images.length === 0) {
      alert("You must have at least one image!");
    }

    if (!mainImage) {
      alert("Main image is missing.");
      return;
    }
    const mainImageUrl = await uploadImages([mainImage]);
    const imagesToUpload = images.filter((image) => image !== mainImage);

    let uploadedImageUrls: string[] = [];
    if (imagesToUpload.length > 0) {
      uploadedImageUrls = await uploadImages(imagesToUpload);
    }
    const { data: productData, error: productError } = await supabase
      .from("DIM_PRODUCT")
      .insert([
        {
          PROD_NAME: input.name,
          PROD_DESC: input.description,
          PROD_SHORTDESC: input.short_desc,
          PROD_PRICE: input.price,
          PROD_STOCKS: input.stock,
          PROD_CATEGORY: input.category,
          PROD_CONDITION: input.condition,
          SELLER_ID: user?.id,
        },
      ])
      .select();

    if (productError) {
      console.error("Error inserting product:", productError.message);
      return;
    }

    const productId = productData[0]?.PRODUCT_ID;

    if (!productId) {
      console.error("Product ID is null or undefined.");
      return;
    }

    const mainImageRecord = {
      PRODUCT_PICTURED_FK: productId,
      PRODUCT_IMAGE: mainImageUrl[0],
      isMainImage: true,
    };

    const imageRecords = uploadedImageUrls.map((url) => ({
      PRODUCT_PICTURED_FK: productId,
      PRODUCT_IMAGE: url,
      isMainImage: false,
    }));

    const { error: imageError } = await supabase
      .from("DIM_PRODUCTIMAGES")
      .insert([mainImageRecord, ...imageRecords]);

    if (imageError) {
      console.error("Error inserting images:", imageError.message);
      return;
    }

    nav("/home");
  };

  const options = CategoryArray.map((category) => category.CategoryName);

  return (
    <div className="app-wrapper bg-white flex flex-col items-center justify-center min-h-screen overflow-y-auto">
      <div className="post-page p-6 flex flex-col flex-1 h-full w-full rounded-xl">
        <div className="justify-center align-center flex bg-gradient-to-r from-[#26245f] to-[#18181b] text-white rounded-xl p-4">
          <h1 className="text-xl">
            {!isEditMode ? "Post a Product" : "Edit Product"}
          </h1>
        </div>
        <div className="main-app flex w-full flex-col justify-center space-y-2 lg:flex-row space-x-2">
          <div className="left flex w-full h-full flex-col space-y-4 md:flex-[3] lg:flex-[4] xl:flex-[5.5]">
            <div className="gen-info flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <h1 className="text-xl">General Information</h1>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name">Name of Product</label>
                  <input
                    id="name"
                    className="flex-1 rounded-xl border-2 border-black p-4 placeholder-gray-500"
                    type="text"
                    value={input.name}
                    placeholder="Make the product name stand out!"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description">Full Description</label>
                  <textarea
                    id="description"
                    value={input.description}
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
                    value={input.short_desc}
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
                    value={input.price}
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
                    value={input.stock}
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
                      selected={
                        CategoryArray.find(
                          (cat) => cat.CategoryID === input.category
                        )?.CategoryName
                      }
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
                          value={input.condition}
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
          <div className="right space-y-4 h-full w-full flex flex-col md:flex-[2]">
            <div className="flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4">
              <div
                {...getRootProps({
                  className:
                    "product-display flex-[3] flex flex-col rounded-2xl 2xl:flex-[3] xl:m-4",
                })}
              >
                <input {...getInputProps()} />
                {images.length === 0 ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="aspect-square bg-gray-200 rounded-lg shadow-md sm:m-4 md:m-2">
                      <img
                        className="h-full w-full object-cover rounded-lg aspect-square"
                        src={
                          mainImage
                            ? URL.createObjectURL(mainImage)
                            : placeholder
                        }
                        alt="Product"
                      />
                    </div>
                    <div className="gallery grid grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-4 p-2 w-full sm:px-5 md:p-2">
                      {galleryImages.map((src, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-lg border aspect-square shadow-sm"
                          onClick={() => handleImageClick(src)}
                        >
                          <img
                            className="h-full w-full object-cover rounded-lg"
                            src={URL.createObjectURL(src)}
                            alt="Product"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering handleImageClick
                              removeGalleryImage(src);
                            }}
                            className="remove-button"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="prompt">
                {images.length < 5 ? (
                  <p>Drag and Drop your product images!</p>
                ) : (
                  <p>Maximum of 5 images only!</p>
                )}
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
