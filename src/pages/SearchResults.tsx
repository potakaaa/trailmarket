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
      if (value === "High to Low") {
        handlePriceOrderChange("high");
      } else if (value === "Low to High") {
        handlePriceOrderChange("low");
      } else if (value === "Latest to Oldest") {
        handleSortOrderChange("latest");
      } else if (value === "Oldest to Latest") {
        handleSortOrderChange("oldest");
      }
    };

  const handleSortOrderChange = (order: string) => {
    setDateOrder((prevOrder) => (prevOrder === order ? "none" : order));
    setPriceOrder("none"); // Turn off price sorting when date sorting is applied
  };

  const handlePriceOrderChange = (order: string) => {
    setPriceOrder((prevOrder) => (prevOrder === order ? "none" : order));
    setDateOrder("none"); // Turn off date sorting when price sorting is applied
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
    let processedProducts: ProductType[] = [...products];

    // Step 1: Apply search filter
    if (searchState) {
      processedProducts = processedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchState.toLowerCase())
      );
    }

    // Step 2: Apply category filter
    if (
      selectedCategory &&
      selectedCategory !== CategoryArray[0].CategoryName
    ) {
      processedProducts = processedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Step 3: Apply sorting logic
    processedProducts.sort((a, b) => {
      // Sorting by date
      if (dateOrder === "latest") {
        return b.id - a.id; // Higher ID = Latest
      } else if (dateOrder === "oldest") {
        return a.id - b.id; // Lower ID = Oldest
      }

      // Sorting by price
      if (priceOrder === "high") {
        return b.price - a.price; // Higher price first
      } else if (priceOrder === "low") {
        return a.price - b.price; // Lower price first
      }

      // Default: No sorting
      return 0;
    });

    // Update filtered products state
    setFilteredProducts(processedProducts);
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
                    <button
                      className={`px-6 py-1  border-2 border-black rounded-3xl ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleCategoryClicked(category)}
                    >
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
                  selected="Price"
                ></Dropdown>
              </div>
              <div className="p-4">
                <Dropdown
                  buttonStyle="md:hidden px-6 py-1 bg-white border-2 border-black rounded-xl"
                  optionStyle="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50"
                  onSelect={handleSelect}
                  options={["Date", "Latest to Oldest", "Oldest to Latest"]}
                  selected="Date"
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
