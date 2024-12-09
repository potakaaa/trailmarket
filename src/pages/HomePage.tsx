import HomePageCategories from "./HomePage/HomePageCategories";
import {
  CategoryArray,
  fetchCategories,
  fetchProducts,
} from "./context/Globals";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Product as ProductType } from "./context/Globals";
import NavBar from "./navbar/NavBar";
import TopNavBar from "./navbar/TopNavBar";

const HomePage = () => {
  const { setIsFetched } = useAuthContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { setIsLoading } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchCategories();
      const fetchedProducts = await fetchProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
      setIsFetched(true);
      setIsLoading(false);
    };

    fetchData();
  }, [setIsFetched]);

  return (
    <div className="HomePage size-full flex flex-col justify-center items-center">
      <TopNavBar />
      <NavBar obj={[]} />
      <div className="size-full px-3">
        <div className="HomePageCategories w-full">
          <div className="CategoriesHeader bg-gradient-to-r from-[#282667] to-slate-900 p-4 sm:p-7 mx-4 rounded-2xl">
            <h1 className="CategoriesTitle text-2xl sm:text-4xl text-white text-center font-medium">
              CATEGORIES
            </h1>
            <p className="CategoriesDesc text-[9px] sm:text-sm text-white text-center font-normal">
              Pick one to simplify your search
            </p>
          </div>
          <div className="CategoriesBody sm:grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap">
            {CategoryArray.filter((_, index) => index !== 0).map(
              (category, index) => (
                <HomePageCategories
                  key={index}
                  name={category.CategoryName}
                  desc={category.CategoryDesc}
                  price={category.CategoryStartPrice}
                  image={category.CategoryImage}
                />
              )
            )}
          </div>
        </div>
        <div className="HomePageProducts flex w-full flex-wrap md:grid-cols-2 xl:grid-cols-4 justify-center">
          {products.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
