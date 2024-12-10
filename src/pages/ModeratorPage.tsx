import { useEffect } from "react";
import { supabase } from "../createClient";
import { useAuthContext } from "./context/AuthContext";
import AdminNavBar from "./navbar/AdminNavBar";
import TopNavBar from "./navbar/TopNavBar";

const ModeratorPage = () => {
  const { userList, setUserList, setProdList, prodList } = useAuthContext();
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("DIM_USER").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
      return [];
    }
    if (data) {
      const tempUserList = data.map((user: any) => ({
        id: user.STUDENT_ID,
        name: user.USER_NAME,
        age: user.USER_AGE,
        email: user.USER_EMAIL,
        pass: null,
        contact_num: user.USER_CONTACTNUM,
        fb: user.USER_FB,
        image: user.USER_IMAGE,
        prods: [],
      }));
      setUserList(tempUserList);
      console.log("Fetched users:", tempUserList);
    }
  };

  const fetchUserPosts = async (stud_id: number) => {
    const { data, error } = await supabase
      .from("DIM_PRODUCT")
      .select("*")
      .eq("SELLER_ID", stud_id);

    if (error) {
      console.error("Error fetching user posts:", error.message);
      return;
    }
    if (data) {
      const tempProdList = data.map((prod: any) => ({
        id: prod.PRODUCT_ID,
        name: prod.PROD_NAME,
        price: prod.PROD_PRICE,
        condition: prod.PROD_CONDITION,
        category: prod.PROD_CATEGORY,
        stock: prod.PROD_STOCKS,
        desc: prod.PROD_DESC,
        short_desc: prod.PROD_SHORTDESC,
        img: undefined,
        seller: prod.SELLER_ID,
      }));
      setProdList(tempProdList);
      console.log(prodList);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [setUserList]);

  return (
    <div className="app-wrapper size-full ">
      <TopNavBar />
      <AdminNavBar />
      <div className="main-container px-4 flex flex-col gap-3"></div>
    </div>
  );
};

export default ModeratorPage;
