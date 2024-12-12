import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  sellerId: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  stock,
  imageUrl: initialImageUrl,
  sellerId,
}) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    const fetchMainImageUrl = async () => {
      const { data, error } = await supabase
        .from("DIM_PRODUCTIMAGES")
        .select("PRODUCT_IMAGE")
        .eq("PRODUCT_PICTURED_FK", id)
        .eq("isMainImage", true)
        .single();

      if (error) {
        console.error("Error fetching main image URL:", error.message);
      } else if (data) {
        setImageUrl(data.PRODUCT_IMAGE);
      }
    };

    fetchMainImageUrl();
  }, [id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase
        .from("DIM_USER") // Ensure this table name exists in Supabase Database
        .select("USER_NAME, USER_IMAGE")
        .eq("STUDENT_ID", sellerId)
        .single();

      if (error) {
        console.error("Error fetching user details:", error.message);
      } else if (data) {
        setUsername(data.USER_NAME);
        setUserImage(data.USER_IMAGE);
      }
    };

    fetchUserDetails();
  }, [sellerId]);

  return (
    <div className="PRODUCT-CONTAINER group space-y-3 flex flex-col w-60 sm:w-72 p-4 md:max-w-md hover:shadow-xl rounded-xl transition-all duration-300 hover:w-64 sm:hover:w-80">
      <button
        className="flex flex-col gap-3"
        onClick={() => {
          nav(`/product/${id}`);
        }}
      >
        <div className="flex w-full rounded-xl overflow-hidden aspect-square">
          <img src={imageUrl} className="object-cover shadow-md" alt={name} />
        </div>
        <div className="flex w-full bg-zinc-900 rounded-xl h-36 p-4 flex-col">
          <div className="left-side flex-[3] flex flex-col align-top">
            <div className="flex flex-row align-middle space-x-2">
              <div className="w-4 h-4 rounded-full overflow-hidden border border-black">
                <img
                  className="object-cover h-full w-full"
                  src={userImage}
                  alt="User"
                />
              </div>
              <p className="text-[10px] sm:text-xs align-middle text-left justify-center items-center flex text-white">
                {username}
              </p>
            </div>
            <h2 className="text-white font-medium text-center text-xs sm:text-sm my-2">
              {name}
            </h2>
          </div>
          <div className="right-side flex flex-[2] flex-col justify-start text-center">
            <h2 className="text-white text-lg md:text-lg xl:text-2xl">
              ₱ {price.toFixed(2)} pesos
            </h2>
            <h2 className="text-white font-normal text-xs md:text-xs xl:text-sm">
              Stock available: {stock}
            </h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Product;
