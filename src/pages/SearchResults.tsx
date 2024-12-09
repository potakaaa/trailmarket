import { useEffect, useState } from "react";
import Dropdown from "./DropDown";
import { useAuthContext } from "./context/AuthContext";
import { fetchCategories, fetchProducts } from "./context/Globals";
import { Product as ProductType } from "./context/Globals";
import Product from "./Product";

const categories = ["Bags", "Accessories", "Clothes", "Gadgets"];

const SearchResults = () => {
  const { setIsFetched } = useAuthContext();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      const fetchedProducts = await fetchProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
      setIsFetched(true);
    };

    fetchData();
  }, [setIsFetched]);

  const { searchState } = useAuthContext();
  if (!searchState) {
    return null; // Do not render anything if searchState is empty
  }
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div className="flex flex-col">
      <div className="app-wrapper flex flex-col items-center justify-start min-h-screen w-full overflow-y-visible px-3">
        <div className="search-wrapper flex flex-col h-full w-full space-y-6 md:space-y-0 md:flex-row space-x-2 p-4">
          <div className="filter-sort flex flex-[1] bg-gray-50 h-full drop-shadow-xl rounded-xl p-4 z-10 justify-center">
            <div className="hidden Normal-filter-sort md:flex flex-col space-y-4 w-full h-full">
              <h1>Filter or Sort</h1>

              <div>
                <h1>By Tags</h1>
                <div className="space-y-2 lg:space-x-1">
                  {categories.map((category) => (
                    <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h1>By Price</h1>
                <div className="space-y-2 lg:space-x-1">
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    High To Low
                  </button>
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    Low To High
                  </button>
                </div>
              </div>

              <div>
                <h1>By Date</h1>
                <div className="space-y-2 lg:space-x-1">
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    Latest to Oldest
                  </button>
                  <button className="px-6 py-1 bg-white border-2 border-black rounded-3xl">
                    Oldest to Latest
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={categories}
                ></Dropdown>
              </div>
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={["Price", "High to Low", "Low to High"]}
                ></Dropdown>
              </div>
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={["Date", "Latest to Oldest", "Oldest to Latest"]}
                ></Dropdown>
              </div>
            </div>
          </div>
          <div className="search-results flex flex-[3] bg-gray-50 drop-shadow-xl rounded-xl p-2 flex-col space-y-3">
            <h1>Search Results for :INPUTTED SEARCH:</h1>
            <div className=" result-container w-full flex flex-col items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2">
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
      </div>
    </div>
  );
};

export default SearchResults;
