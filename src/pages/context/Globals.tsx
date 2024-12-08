import { supabase } from "../../createClient";

// Exported global variable to store categories (useful for debugging or advanced cases)
export let CategoryArray = [
  {
    CategoryName: "All Categories",
    CategoryDesc: "",
    CategoryStartPrice: 0,
    CategoryImage: "",
  },
];

export const fetchCategories = async () => {
  console.log("Fetching categories...");
  const { data, error } = await supabase
    .from("DIM_CATEGORY")
    .select("*")
    .order("CATEGORY_ID", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  if (data) {
    console.log("Fetched categories:", data);

    CategoryArray = [
      {
        CategoryName: "All Categories",
        CategoryDesc: "",
        CategoryStartPrice: 0,
        CategoryImage: "",
      },
      ...data.map((category: any) => ({
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
