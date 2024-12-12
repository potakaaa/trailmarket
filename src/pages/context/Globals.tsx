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

    for (const category of categoryData) {
      const { data: productData, error: productError } = await supabase
        .from("PRODUCT")
        .select("PRICE")
        .eq("CATEGORY_ID", category.CATEGORY_ID)
        .order("PRICE", { ascending: true })
        .limit(1);

      if (productError) {
        console.error(
          `Error fetching products for category ${category.CATEGORY_ID}:`,
          productError.message
        );
        category.CategoryStartPrice = 0; // Default to 0 if there's an error
      } else if (productData && productData.length > 0) {
        category.CategoryStartPrice = productData[0].PRICE;
      } else {
        category.CategoryStartPrice = 0; // Default to 0 if no products found
      }
    }
    CategoryArray = [
      {
        CategoryID: 0,
        CategoryName: "All Categories",
        CategoryDesc: "",
        CategoryStartPrice: 0,
        CategoryImage: "",
      },
      ...categoryData.map((category: any) => ({
        CategoryID: category.CATEGORY_ID,
        CategoryName: category.CATEGORY_NAME,
        CategoryDesc: category.CATEGORY_DESC || "",
        CategoryStartPrice: category.CategoryStartPrice || 0,
        CategoryImage: category.CATEGORY_IMAGE || "",
      })),
    ];
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
