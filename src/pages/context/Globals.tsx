import { supabase } from "../../createClient";

export let CategoryArray = [
  {
    CategoryID: 0,
    CategoryName: "All Categories",
    CategoryDesc: "",
    CategoryStartPrice: 0,
    CategoryImage: "",
  },
];

export let ProductArray: Product[] = [];

export const fetchCategories = async () => {
  console.log("Fetching categories...");
  const { data: categoryData, error } = await supabase
    .from("DIM_CATEGORY")
    .select("*")
    .order("CATEGORY_ID", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  if (categoryData) {
    console.log("Fetched categories:", categoryData);

    // Use Promise.all to fetch the minimum price for each category concurrently
    const enrichedCategories = await Promise.all(
      categoryData.map(async (category: any) => {
        let CategoryStartPrice = 0;

        // Fetch the product with the lowest price in this category
        const { data: productData, error: productError } = await supabase
          .from("DIM_PRODUCT")
          .select("PROD_PRICE")
          .eq("PROD_CATEGORY", category.CATEGORY_ID)
          .order("PROD_PRICE", { ascending: true })
          .limit(1);

        if (productError) {
          console.error(
            `Error fetching products for category ${category.CATEGORY_ID}:`,
            productError.message
          );
        } else if (productData && productData.length > 0) {
          CategoryStartPrice = productData[0].PROD_PRICE;
        }

        // Return the enriched category object
        return {
          CategoryID: category.CATEGORY_ID,
          CategoryName: category.CATEGORY_NAME,
          CategoryDesc: category.CATEGORY_DESC || "",
          CategoryStartPrice, // Use the calculated value
          CategoryImage: category.CATEGORY_IMAGE || "",
        };
      })
    );

    // Include the "All Categories" default item at the start of the array
    CategoryArray = [
      {
        CategoryID: 0,
        CategoryName: "All Categories",
        CategoryDesc: "",
        CategoryStartPrice: 0,
        CategoryImage: "",
      },
      ...enrichedCategories,
    ];

    console.log("Final CategoryArray:", CategoryArray); // Debugging
    return CategoryArray;
  }
};


export const addCategory = async (newCategory: string) => {
  if (CategoryArray.some((category) => category.CategoryName === newCategory)) {
    alert("Category already exists!");
    return false;
  }

  const { data, error } = await supabase.from("DIM_CATEGORY").insert([
    {
      CATEGORY_NAME: newCategory,
    },
  ]);

  if (error) {
    console.error("Error adding category:", error.message);
    return false;
  }

  console.log("Category added:", data);
  return true; // Indicate success
};

export type Product = {
  id: number;
  name: string;
  price: number;
  condition: string;
  category: string;
  stock: number;
  description: string;
  imageUrl: string;
  sellerId: string;
};

export const fetchProducts = async () => {
  console.log("Fetching products...");
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
    .order("PRODUCT_ID", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  if (data) {
    console.log("Fetched products:", data);

    ProductArray = data.map((product: any) => ({
      id: product.PRODUCT_ID,
      name: product.PROD_NAME,
      price: product.PROD_PRICE,
      condition: product.PROD_CONDITION,
      category: product.CATEGORY
        ? product.CATEGORY.CATEGORY_NAME
        : "Unknown Category",
      stock: product.PROD_STOCKS,
      description: product.PROD_DESC,
      sellerId: product.SELLER_ID,
      imageUrl: "https://via.placeholder.com/150",
    }));

    console.log("Updated ProductArray:", ProductArray); // Debugging

    return ProductArray;
  }
};
