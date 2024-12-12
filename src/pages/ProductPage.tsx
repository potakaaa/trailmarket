import { useState, useEffect } from "react";
import { supabase } from "../createClient";
import { useParams, useNavigate } from "react-router-dom";

import { CheckoutProd, FactCart, useAuthContext } from "./context/AuthContext";
import { renderStars, StarRating } from "./Stars";
import { ChangeEvent } from "react";

const ProductPage = () => {
  const nav = useNavigate();
  const [count, setCount] = useState(1);
  const [rating, setRating] = useState(0);
  const placeholder = "https://via.placeholder.com/150";
  const [reviews, setReviews] = useState<any[]>([]);
  const [input, setInput] = useState({
    review: "",
    reviewtitle: "",
  });
  const [averageRating, setAverageRating] = useState(0);
  const [highRatingPercentage, setHighRatingPercentage] = useState(0);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setInput((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const { user, setIsLoading, checkoutProds, setCheckoutProds } =
    useAuthContext();
  const [otherImages, setOtherImages] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleReviewSubmit = async () => {
    console.log("Submitting form with data:", input);

    const { error: reviewError } = await supabase.from("DIM_REVIEW").insert([
      {
        REVIEW_TITLE: input.reviewtitle,
        REVIEW_DESC: input.review,
        REVIEW_RATING: rating,
        REVIEW_PROD: id,
        REVIEWER_ID: user?.id,
      },
    ]);

    if (reviewError) {
      console.error("Error submitting review:", reviewError.message);
    } else {
      fetchReviews();
    }
  };
  const fetchReviews = async () => {
    const { data: reviewsData, error: reviewsError } = await supabase
      .from("DIM_REVIEW")
      .select("*")
      .eq("REVIEW_PROD", id)
      .order("REVIEW_DATE", { ascending: false });

    if (reviewsError) {
      console.error("Error fetching reviews:", reviewsError.message);
    } else {
      const reviewsWithUserDetails = await Promise.all(
        reviewsData.map(async (review) => {
          const userDetails = await fetchReviewerDetails(review.REVIEWER_ID);
          return {
            ...review,
            username: userDetails?.USER_NAME || "Unknown User",
            userImage: userDetails?.USER_IMAGE || placeholder,
          };
        })
      );
      setReviews(reviewsWithUserDetails);

      const totalRating = reviewsWithUserDetails.reduce(
        (sum, review) => sum + review.REVIEW_RATING,
        0
      );
      const averageRating = totalRating / reviewsWithUserDetails.length;
      setAverageRating(averageRating);

      // Calculate the percentage of high ratings (3.5 and above)
      const highRatingCount = reviewsWithUserDetails.filter(
        (review) => review.REVIEW_RATING >= 3.5
      ).length;
      const highRatingPercentage =
        (highRatingCount / reviewsWithUserDetails.length) * 100;
      setHighRatingPercentage(highRatingPercentage);
    }
  };
  const images = [mainImage, otherImages].flat();

  const unselectedImages = images.filter((img) => img !== selectedImage);
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
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
        .eq("PRODUCT_ID", id)
        .single();

      if (error) {
        console.error("Error fetching product details:", error.message);
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    };
    const fetchProductImages = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("DIM_PRODUCTIMAGES")
        .select("PRODUCT_IMAGE, isMainImage")
        .eq("PRODUCT_PICTURED_FK", id);

      if (error) {
        console.error("Error fetching product images:", error.message);
      } else {
        const mainImg = data.find((img: any) => img.isMainImage)?.PRODUCT_IMAGE;
        const otherImgs = data
          .filter((img: any) => !img.isMainImage)
          .map((img: any) => img.PRODUCT_IMAGE);
        setMainImage(mainImg || "");
        setOtherImages(otherImgs);
        setSelectedImage(mainImg || "");
      }
      setIsLoading(false);
    };

    fetchProductDetails();
    fetchProductImages();
  }, [id]);

  const fetchReviewerDetails = async (userId: string) => {
    const { data, error } = await supabase
      .from("DIM_USER")
      .select("USER_NAME, USER_IMAGE")
      .eq("STUDENT_ID", userId)
      .single();

    if (error) {
      console.error("Error fetching reviewer details:", error.message);
      return null;
    } else {
      return data;
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!product?.SELLER_ID) return;

      try {
        const { data, error } = await supabase
          .from("DIM_USER")
          .select("USER_NAME, USER_IMAGE")
          .eq("STUDENT_ID", product.SELLER_ID)
          .single();

        if (error) {
          console.error("Error fetching user details:", error.message);
        } else {
          setUsername(data.USER_NAME);
          setUserImage(data.USER_IMAGE);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Unexpected error fetching user details:", err.message);
        } else {
          console.error("Unexpected error fetching user details:", err);
        }
      }
    };

    fetchUserDetails();
  }, [product]);
  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handlePlus = () => {
    if (count < product.PROD_STOCKS) {
      setCount(count + 1);
    }
  };

  const handeUserVisit = () => {
    nav(`/profile/${product.SELLER_ID}`);
  };

  const handleMinus = () => {
    if (count != 1) {
      setCount(count - 1);
    }
  };

  const handleEdit = () => {
    console.log("Edit product");
  };

  const handleDelete = async () => {
    console.log("Delete product");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const { data: images, error: fetchError } = await supabase
          .from("DIM_PRODUCTIMAGES")
          .select("PRODUCT_IMAGE")
          .eq("PRODUCT_PICTURED_FK", id);

        if (fetchError) {
          throw fetchError;
        }

        for (const image of images) {
          const url = new URL(image.PRODUCT_IMAGE);
          const basePath = "trailmarket-images/";
          const imagePath = url.pathname.replace(
            `/storage/v1/object/public/${basePath}`,
            ""
          );
          console.log(`Deleting image from storage: ${imagePath}`);
          const { error: storageError } = await supabase.storage
            .from("trailmarket-images")
            .remove([imagePath]);

          if (storageError) {
            console.error(
              `Error deleting image from storage: ${imagePath}`,
              storageError
            );
            throw storageError;
          }
        }

        const { error: deleteProductError } = await supabase
          .from("DIM_PRODUCT")
          .delete()
          .eq("PRODUCT_ID", id);

        if (deleteProductError) {
          throw deleteProductError;
        }

        alert("Product and associated images deleted successfully!");
        nav("/home");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error deleting product and images:", error.message);
          alert(`Error deleting product and images: ${error.message}`);
        } else {
          console.error("Error deleting product and images:", error);
          alert("Error deleting product and images.");
        }
      }
    }
  };

  const fetchCart = async () => {
    const { error: fetchError } = await supabase
      .from("DIM_CART")
      .select("*")
      .eq("CART_USER", user?.id);

    if (fetchError) {
      console.error("Error fetching cart 3:", fetchError.message);
      alert("An error occurred while adding the product to your cart.");
      return;
    }
  };

  const handleCheckout = () => {
    const tempCheckoutProd: CheckoutProd = {
      orderId: null,
      orderListId: null,
      prod_fk: product.PRODUCT_ID,
      meetupLoc: null,
      meetupDate: null,
      meetupTime: null,
      quantity: count,
      prodName: product.PROD_NAME,
      prodPrice: product.PROD_PRICE,
      prodImg: mainImage,
      paymentMethod: null,
      paymentDate: null,
      paymentStatus: null,
    };
    setCheckoutProds([...checkoutProds, tempCheckoutProd]);
    nav("/checkout");
    console.log(checkoutProds);
  };

  const handleAddCart = async (productId: number, quantity: number = 1) => {
    setIsLoading(true);
    try {
      await fetchCart();
      const { data: cartData, error: cartError } = await supabase
        .from("DIM_CART")
        .select(
          `
        CART_ID,
        CART_USER,
        FACT_CART_PROD(
          CART_PROD_ID,
          PRODUCT_FK,
          CART_QUANTITY
        )
      `
        )
        .eq("CART_USER", user?.id);

      if (cartError) {
        console.error("Error fetching cart:", cartError.message);
        return;
      }

      let cartId;
      let existingCartProd = null;

      if (cartData && cartData.length > 0) {
        cartId = cartData[0].CART_ID;
        existingCartProd = cartData[0].FACT_CART_PROD.find(
          (prod) => String(prod.PRODUCT_FK) === String(productId)
        );
      }

      if (existingCartProd) {
        const newQuantity = existingCartProd.CART_QUANTITY + quantity;
        const { error: updateError } = await supabase
          .from("FACT_CART_PROD")
          .update({ CART_QUANTITY: newQuantity })
          .eq("CART_PROD_ID", existingCartProd.CART_PROD_ID);

        if (updateError) {
          console.error("1", updateError.message);
          console.log("qunatity problem");
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("FACT_CART_PROD")
          .insert({
            CART_FK: cartId,
            PRODUCT_FK: productId,
            CART_QUANTITY: quantity,
          });

        if (insertError) {
          console.error(insertError.message);
          alert("An error occurred while adding the product to your cart.");
          return;
        }
      }

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the product to your cart.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div className="app-wrapper flex items-center justify-center min-h-screen overflow-scroll ">
        <div className="flex justify-center items-center">
          <div className="product-cntnr flex flex-col justify-center items-center h-auto w-[95vw] bg-white rounded-lg shadow-lg pb-2 2xl:pb-5">
            <div className="product-top flex flex-col md:flex-row flex-[3] w-full px-1 h-auto">
              <div className="product-display flex-[3] flex flex-col rounded-2xl 2xl:flex-[3] xl:m-4">
                <div className="aspect-square bg-gray-200 rounded-lg shadow-md sm:m-4 md:m-2">
                  <img
                    className="h-full w- object-cover rounded-lg"
                    src={selectedImage}
                    alt="Product"
                  />
                </div>
                <div className="gallery grid grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-4 p-2 w-full sm:px-5 md:p-2">
                  {unselectedImages.map((image) => (
                    <div className="bg-gray-100 rounded-lg border aspect-square shadow-sm">
                      <img
                        className="h-full w-full object-cover rounded-lg"
                        src={image}
                        alt="Product"
                        onClick={() => handleImageClick(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-[4] flex-col">
                <div className="product-details flex-[5] flex flex-col xl:my-4 xl:mr-4 2xl:flex-[0]">
                  <div className="product-name flex-[1] 2xl:flex-[0] items-center justify-centerbg-gray-100 rounded-lg m-2 sm:m-5 md:mx-6">
                    <div>
                      <button onClick={handeUserVisit}>
                        <div className="flex flex-row align-middle space-x-2 items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-black">
                            <img
                              className="object-cover h-full w-full"
                              src={userImage}
                              alt="User"
                            />
                          </div>
                          <div className=" h-full align-middle">
                            <p className="text-xl align-middle justify-center">
                              {username}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-[4rem] ">
                      {product.PROD_NAME}
                    </h1>
                    <h2 className="text-sm font-normal md:text-base xl:mt-3 xl:text-lg 2xl:text-xl">
                      {product.PROD_DESC}
                    </h2>
                    {product.SELLER_ID === user?.id && (
                      <div className="product-actions flex flex-row space-x-2 pt-2">
                        <button
                          onClick={handleEdit}
                          className="edit-button px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="delete-button px-10 py-2 text-base border-2 border-black text-black bg-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-red-300 hover:text-black transition duration-300 text-center flex justify-center items-center"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="product-price flex-[1] 2xl:flex-[0] items-center justify-center bg-gray-900 rounded-lg my-2 py-4 sm:mx-3 2xl:pl-4">
                    <h1 className="text-2xl md:text-4xl text-gray-100 mx-4 sm:mx-6 sm:text-3xl md:mx-7 md:my-3 xl:text-5xl 2xl:text-[4rem] 2xl:my-5">
                      PHP {product.PROD_PRICE.toFixed(2)}
                    </h1>
                    <div className="mt-2 mx-3 flex-row space-x-2 pb-2 sm:mx-5 sm:mt-3 md:mx-6 md:my-3 xl:my-5 2xl:my-8">
                      <button
                        className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-base xl:mr-3 2xl:text-xl"
                        onClick={() => handleAddCart(product.PRODUCT_ID, count)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-base 2xl:text-xl"
                        onClick={() => {
                          handleCheckout();
                        }}
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-bottom flex-col mr-7 ml-1 hidden 2xl:flex">
                  <div className="product-info flex flex-col items-start justify-start bg-gray-100 rounded-lg my-2 ml-2 p-4 mb-6">
                    <h1 className="mx-4 mt-1.5 text-4xl">
                      Product Information
                    </h1>
                    <p className="text-xs font-normal mx-4 xl:text-sm xl:ml-[18px]">
                      Product Details
                    </p>
                    <div className="flex flex-row space-x-2 m-2 w-full justify-between gap-7 md:mt-6">
                      <h2 className="mx-2.5 text-center text-lg flex justify-center items-center">
                        Category
                      </h2>
                      <div className="flex gap-3 flex-1">
                        <p className="px-10 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center">
                          {product.CATEGORY.CATEGORY_NAME}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-2 m-5 justify-between gap-16">
                      <h3 className="text-lg text-center flex justify-center items-center">
                        Quantity
                      </h3>
                      <div className="flex gap-2 flex-1 justify-center ">
                        <button
                          onClick={handleMinus}
                          className="flex px-8 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-20 text-base justify-center items-center text-center border-2 border-black rounded-full bg-gray [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={count}
                        />
                        <button
                          onClick={handlePlus}
                          className="px-8 py-2 text-base border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="leave-rev flex-[5] p-2 flex-row items-start justify-start bg-gray-100 rounded-lg my-2 sm:mx-4 sm:p-2 space-y-3">
                    <div className="flex flex-col mx-2.5">
                      <h1 className=" mt-1.5 text-2xl xl:text-3xl">
                        Leave a Review
                      </h1>
                      <div className="">
                        <StarRating rating={rating} setRating={setRating} />
                      </div>
                      <input
                        id="reviewtitle"
                        className="bg-gray-100 mt-2 p-2 rounded border-black border-2"
                        placeholder="Title your review!"
                        onChange={handleChange}
                      ></input>
                      <textarea
                        id="review"
                        className="bg-gray-100 mt-2 p-2 rounded border-black border-2 h-52"
                        placeholder="Write your review here"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex">
                      <button
                        className="mx-2 px-3 py-2 text-xs border-2 border-zinc-900 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-zinc-900 hover:text-white transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl"
                        onClick={handleReviewSubmit}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                  <div className="product-reviews flex-[5] items-start justify-start bg-gray-100 rounded-lg p-5 ml-2">
                    <div className=" review-container flex flex-col mb-3">
                      <h1 className="mx-2 mt-1.5 text-4xl">Customer Reviews</h1>
                      <div className=" review-ave flex space-x-1 mx-2.5 my-1">
                        {renderStars(averageRating)}
                        <h3 className="text-sm font-medium">{`(${reviews.length} reviews)`}</h3>
                      </div>
                      <h2 className="review-percent text-[11px] mx-2.5 font-medium xl:text-sm">
                        {highRatingPercentage.toFixed(2)}% of costumers are
                        satisfied
                      </h2>
                    </div>
                    {reviews.map((review) => (
                      <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                        <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                          <div className="w-full flex items-center my-1 xl:my-2">
                            <button className="flex gap-4 w-full items-center">
                              <div className="w-12 h-12 rounded-full overflow-hidden border border-black">
                                <img
                                  className="object-cover h-full w-full"
                                  src={review.userImage}
                                  alt="User"
                                />
                              </div>
                              <p className="text-xl">{review.username}</p>
                            </button>
                            <div className="flex flex-row justify-end items-end w-full mx-2">
                              {renderStars(review.REVIEW_RATING)}
                            </div>
                          </div>
                          <h1 className="font-bold text-base">
                            {review.REVIEW_TITLE}
                          </h1>
                          <h1 className="font-normal text-base">
                            {review.REVIEW_DESC}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="product-bottom flex flex-[1] flex-col md:flex-row xl:ml-4 xl:mr-4 2xl:hidden">
              <div className="product-info flex-wrap flex-[3] flex flex-col items-start justify-start bg-gray-100 rounded-lg my-2 sm:mx-4 sm:p-1 sm:pt-3 md:ml-3 md:mr-1  ">
                <h1 className="mx-4 mt-1.5 text-2xl sm:text-2xl xl:text-3xl">
                  Product Information
                </h1>
                <p className="text-xs font-normal mx-4 xl:text-sm xl:ml-[18px]">
                  Product Details
                </p>
                <div className="flex flex-row space-x-2 m-2 w-full justify-between gap-7 md:gap-3 md:mt-6 ">
                  <h2 className="mx-2.5 text-center text-xs flex justify-center items-center sm:text-sm ">
                    Category
                  </h2>
                  <div className="flex gap-3 flex-1">
                    <p className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 text-center flex justify-center items-center sm:text-sm">
                      {product.CATEGORY.CATEGORY_NAME}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 m-5 justify-between gap-10 md:gap-7">
                  <h3 className="text-xs text-center flex justify-center items-center sm:text-sm">
                    Quantity
                  </h3>
                  <div className="flex gap-2 flex-1">
                    <button
                      onClick={handleMinus}
                      className="flex px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 sm:text-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-20 text-xs text-center border-2 border-black rounded-full bg-gray sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={count}
                    />
                    <button
                      onClick={handlePlus}
                      className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 sm:text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="leave-rev flex-[5] p-2 flex-row items-start justify-start bg-gray-100 rounded-lg my-2 sm:mx-4 sm:p-2 space-y-3">
                <div className="flex flex-col mx-2.5">
                  <h1 className=" mt-1.5 text-2xl xl:text-3xl">
                    Leave a Review
                  </h1>
                  <div className="">
                    <StarRating rating={rating} setRating={setRating} />
                  </div>
                  <input
                    id="reviewtitle"
                    className="bg-gray-100 mt-2 p-2 rounded border-black border-2"
                    placeholder="Title your review!"
                    onChange={handleChange}
                  ></input>
                  <textarea
                    id="review"
                    className="bg-gray-100 mt-2 p-2 rounded border-black border-2 h-52"
                    placeholder="Write your review here"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex">
                  <button
                    className="mx-2 px-3 py-2 text-xs border-2 border-zinc-900 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-zinc-900 hover:text-white transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-xl"
                    onClick={handleReviewSubmit}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="product-reviews flex-[5] items-start justify-start bg-gray-100 rounded-lg my-2 sm:mx-4 sm:p-2">
                <div className="flex flex-[1] flex-col mb-3">
                  <h1 className="mx-2 mt-1.5 text-4xl">Customer Reviews</h1>
                  <div className=" review-ave flex space-x-1 mx-2.5 my-1">
                    {renderStars(averageRating)}
                    <h3 className="text-sm font-medium">{`(${reviews.length} reviews)`}</h3>
                  </div>
                  <h2 className="review-percent text-[11px] mx-2.5 font-medium xl:text-sm">
                    {highRatingPercentage.toFixed(2)}% of costumers are
                    satisfied
                  </h2>
                </div>
                {reviews.map((review) => (
                  <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all px-3 my-1 mb-3">
                    <div className='flex flex-col items-start justify-start rounded-lg m-2"'>
                      <div className="w-full flex items-center my-1 xl:my-2">
                        <button className="flex gap-4 w-full items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-black">
                            <img
                              className="object-cover h-full w-full"
                              src={review.userImage}
                              alt="User"
                            />
                          </div>
                          <p className="text-xl">{review.username}</p>
                        </button>
                        <div className="flex flex-row justify-end items-end w-full mx-2">
                          {renderStars(review.REVIEW_RATING)}
                        </div>
                      </div>
                      <h1 className="font-bold text-base">
                        {review.REVIEW_TITLE}
                      </h1>
                      <h1 className="font-normal text-base">
                        {review.REVIEW_DESC}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
