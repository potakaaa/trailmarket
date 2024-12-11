import { useEffect, useState } from "react";
import Dropdown from "./DropDown";
import { useAuthContext } from "./context/AuthContext";
import {
  CategoryArray,
  fetchCategories,
  fetchProducts,
} from "./context/Globals";
import { Product as ProductType } from "./context/Globals";
import Product from "./Product";

const SearchResults = () => {
  const { setIsFetched } = useAuthContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const { selectedCategory, setSelectedCategory } = useAuthContext();
  const [dateOrder, setDateOrder] = useState<string>("latest");
  const [priceOrder, setPriceOrder] = useState<string>("none");
  const categories = CategoryArray.map((category) => category.CategoryName);
  const { searchState } = useAuthContext();
  if (!searchState) {
    return null; // Do not render anything if searchState is empty
  }
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  const handleSortOrderChange = (order: string) => {
    setDateOrder(order);
  };

  const handlePriceOrderChange = (order: string) => {
    setPriceOrder((prevOrder) => (prevOrder === order ? "none" : order));
  };

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

  useEffect(() => {
    let filtered: ProductType[] = [];

    if (searchState) {
      filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchState.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }

    if (selectedCategory) {
      if (selectedCategory === CategoryArray[0].CategoryName) {
        setFilteredProducts(products);
      } else {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }
    }

    if (dateOrder === "latest") {
      filtered.sort((a, b) => b.id - a.id);
    } else {
      filtered.sort((a, b) => a.id - b.id);
    }

    if (priceOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [searchState, selectedCategory, products, dateOrder, priceOrder]);

  async function handleCategoryClicked(categoryName: string) {
    setSelectedCategory(categoryName);
  }

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
                  <button
                    onClick={() => handlePriceOrderChange("high")}
                    className={`px-6 py-1  border-2 border-black rounded-3xl ${
                      priceOrder === "high" ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    High To Low
                  </button>
                  <button
                    onClick={() => handlePriceOrderChange("low")}
                    className={`px-6 py-1  border-2 border-black rounded-3xl ${
                      priceOrder === "low" ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    Low To High
                  </button>
                </div>
              </div>

              <div>
                <h1>By Date</h1>
                <div className="space-y-2 lg:space-x-1">
                  <button
                    onClick={() => handleSortOrderChange("latest")}
                    className={`px-6 py-1  border-2 border-black rounded-3xl ${
                      dateOrder === "latest"
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    Latest to Oldest
                  </button>
                  <button
                    onClick={() => handleSortOrderChange("oldest")}
                    className={`px-6 py-1  border-2 border-black rounded-3xl ${
                      dateOrder === "oldest"
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
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
                  onSelect={handleCategoryClicked}
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
            <h1>Search Results for {searchState}</h1>
            <div className=" result-container w-full flex items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2">
              {filteredProducts.map((product, index) => (
                <Product
                  key={index}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  imageUrl={product.imageUrl}
                  sellerId={product.sellerId}
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
