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
  type Category = {
    CategoryID: number;
    CategoryName: string;
  };
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const { user, setIsLoading } = useAuthContext();
  const nav = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories(); // Fetch categories here
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      } else {
        console.error("Failed to fetch categories.");
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (isEditMode && existingProduct && categories.length > 0) {
      console.log("Existing Product Category:", existingProduct.CATEGORY);
      console.log("Fetched Categories:", categories);

      const matchingCategory = categories.find(
        (category) =>
          category.CategoryName.toLowerCase().trim() ===
          existingProduct.CATEGORY?.CATEGORY_NAME.toLowerCase().trim()
      );

      if (matchingCategory) {
        console.log("Matching Category Found:", matchingCategory);
        setSelectedCategory(matchingCategory);
        setInput((prevState) => ({
          ...prevState,
          category: matchingCategory.CategoryID,
        }));
      } else {
        console.warn(
          `No matching category for "${existingProduct.CATEGORY?.CATEGORY_NAME}"`
        );
      }
    }
  }, [isEditMode, existingProduct, categories]);

  useEffect(() => {
    if (isEditMode && existingProduct) {
      // Pre-fill form fields with existing product data
      setInput((prevState) => ({
        ...prevState,
        name: existingProduct.PROD_NAME || "",
        description: existingProduct.PROD_DESC || "",
        short_desc: existingProduct.PROD_SHORTDESC || "",
        price: existingProduct.PROD_PRICE || "",
        stock: existingProduct.PROD_STOCKS || "",
        condition: existingProduct.PROD_CONDITION || "",
      }));

      const matchingCategory = CategoryArray.find(
        (category) =>
          category.CategoryName === existingProduct.CATEGORY?.CATEGORY_NAME
      );

      if (matchingCategory) {
        setInput((prevState) => ({
          ...prevState,
          category: matchingCategory.CategoryID,
        }));
      }

      console.log("Existing Product:", existingProduct);
      console.log("Category Array:", CategoryArray);
      console.log("Existing Product Category:", existingProduct.CATEGORY);
    }
  }, [isEditMode, existingProduct]);

  useEffect(() => {
    const fetchImages = async () => {
      const mainImageFile = await urlToFile(
        existingProduct.mainImage,
        "main.jpg",
        "image/jpeg"
      );
      const galleryImageFiles = await Promise.all(
        existingProduct.galleryImages.map((url: string, index: number) =>
          urlToFile(url, `gallery-${index}.jpg`, "image/jpeg")
        )
      );
      setMainImage(mainImageFile);
      setGalleryImages(galleryImageFiles || []);
      setImages([mainImageFile, ...galleryImageFiles]);
      console.log("Main Image:", mainImage);
      console.log("Gallery Images:", galleryImages);
      console.log("Images:", images);
    };
    fetchCategories();
    fetchImages();
  }, [existingProduct]);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!mainImage && images.length === 0) {
      const createPlaceholderFile = async () => {
        const response = await fetch(placeholder);
        const blob = await response.blob();
        const file = new File([blob], "placeholder.jpg", {
          type: "image/jpeg",
        });
        setMainImage(file);
        setIsPlaceholder(true);
      };
      createPlaceholderFile();
    }
  }, [mainImage, images]);

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
    const matchingCategory = CategoryArray.find(
      (category) => category.CategoryName === selectedCategoryName
    );

    if (matchingCategory) {
      setSelectedCategory(matchingCategory); // Update the selected category
      setInput((prevFormData) => ({
        ...prevFormData,
        category: matchingCategory.CategoryID, // Set the category ID directly
      }));
    } else {
      console.warn(`Category "${selectedCategoryName}" not found.`);
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

  const handleEditPost = async () => {
    console.log("Editing product with data:", input);

    if (!input.name || !mainImage || images.length === 0) {
      alert(
        "Please ensure all required fields are filled and an image is provided."
      );
      return;
    }

    try {
      const productId = existingProduct?.PRODUCT_ID;
      if (!productId) {
        console.error("Product ID is required for editing.");
        return;
      }

      // Separate new images and existing image URLs
      const newImages = images.filter((image) => image instanceof File);
      const existingImageUrls = images.filter(
        (image) => typeof image === "string"
      );

      // Upload new images
      const uploadedNewImageUrls = newImages.length
        ? await uploadImages(newImages)
        : [];

      // Combine existing and new image URLs
      const updatedImages = [...existingImageUrls, ...uploadedNewImageUrls];

      // Determine the main image URL
      const mainImageUrl =
        typeof mainImage === "string" ? mainImage : uploadedNewImageUrls[0];

      // Update product details
      const { error: productError } = await supabase
        .from("DIM_PRODUCT")
        .update({
          PROD_NAME: input.name,
          PROD_DESC: input.description,
          PROD_SHORTDESC: input.short_desc,
          PROD_PRICE: input.price,
          PROD_STOCKS: input.stock,
          PROD_CATEGORY: input.category,
          PROD_CONDITION: input.condition,
        })
        .eq("PRODUCT_ID", productId);

      if (productError) {
        console.error("Error updating product:", productError.message);
        return;
      }

      // Fetch existing images from the database
      const { data: existingImages, error: existingImagesError } =
        await supabase
          .from("DIM_PRODUCTIMAGES")
          .select("PRODUCT_IMAGE")
          .eq("PRODUCT_PICTURED_FK", productId);

      if (existingImagesError) {
        console.error(
          "Error fetching existing images:",
          existingImagesError.message
        );
        return;
      }

      const existingImageUrlsInDb = existingImages.map(
        (img) => img.PRODUCT_IMAGE
      );

      // Determine removed images
      const removedImages = existingImageUrlsInDb.filter(
        (url) => !updatedImages.includes(url)
      );

      // Delete removed images from storage and database
      for (const imageUrl of removedImages) {
        const filePath = imageUrl.replace(
          `${
            supabase.storage.from("trailmarket-images").getPublicUrl("").data
              .publicUrl
          }/`,
          ""
        );

        const { error: deleteError } = await supabase.storage
          .from("trailmarket-images")
          .remove([filePath]);

        if (deleteError) {
          console.error("Error deleting image:", deleteError.message);
          continue;
        }

        const { error: dbDeleteError } = await supabase
          .from("DIM_PRODUCTIMAGES")
          .delete()
          .eq("PRODUCT_IMAGE", imageUrl);

        if (dbDeleteError) {
          console.error("Error removing image record:", dbDeleteError.message);
          continue;
        }
      }

      // Clear all existing image records and insert updated ones
      const { error: clearImagesError } = await supabase
        .from("DIM_PRODUCTIMAGES")
        .delete()
        .eq("PRODUCT_PICTURED_FK", productId);

      if (clearImagesError) {
        console.error("Error clearing old images:", clearImagesError.message);
        return;
      }

      const mainImageRecord = {
        PRODUCT_PICTURED_FK: productId,
        PRODUCT_IMAGE: mainImageUrl,
        isMainImage: true,
      };

      const galleryImageRecords = updatedImages
        .filter((url) => url !== mainImageUrl)
        .map((url) => ({
          PRODUCT_PICTURED_FK: productId,
          PRODUCT_IMAGE: url,
          isMainImage: false,
        }));

      const { error: insertImagesError } = await supabase
        .from("DIM_PRODUCTIMAGES")
        .insert([mainImageRecord, ...galleryImageRecords]);

      if (insertImagesError) {
        console.error(
          "Error inserting updated images:",
          insertImagesError.message
        );
        return;
      }

      nav("/home");
    } catch (error) {
      console.error("Error handling product edit:", error);
    }
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      await handleEditPost();
    } else {
      await handlePost();
    }
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
                      selected={selectedCategory?.CategoryName}
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
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#26245f] to-[#18181b] text-white font-normal rounded-full w-full h-10 mt-3 self-end shadow-md"
            >
              {isEditMode ? "Edit Product" : "Post Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
