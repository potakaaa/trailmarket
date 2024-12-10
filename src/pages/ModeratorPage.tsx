import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { Prod, useAuthContext, User } from "./context/AuthContext";
import AdminNavBar from "./navbar/AdminNavBar";
import TopNavBar from "./navbar/TopNavBar";

const ModeratorPage = () => {
  const { user, userList, setUserList, setProdList, prodList } =
    useAuthContext();
  const [activeProds, setActiveProds] = useState<Prod[]>([]);
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
      setActiveProds(tempProdList);
      console.log(prodList);
    }
  };

  const handleRowClick = async (stud_id: number) => {
    await fetchUserPosts(stud_id);
    updateProds(stud_id, prodList);
    console.log(user?.prods);
  };

  const renderProds = (prods: Prod[]) => {
    if (prods.length === 0 || !prods) {
      return <div>No products found</div>;
    } else {
      return prods.map((prod, index) => (
        <div>
          <h1 className="text-center bg-gray-100 rounded-md shadow-md text-lg p-1 md:text-xl md:p-3 xl:p-5 2xl:text-2xl w-full">
            {prod.seller}
          </h1>
          <div className="main-container px-4 flex flex-col gap-3 justify-cemter items-center w-full">
            <table className="table-auto border-collapse w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-200 w-full">
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    Name
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    Price
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    Condition
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    Category
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    Seller
                  </th>
                </tr>
              </thead>
              <tr key={index} className="border-t">
                <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                  {prod.name}
                </td>
                <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                  {prod.price}
                </td>
                <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                  {prod.condition}
                </td>
                <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                  {prod.category}
                </td>
                <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                  {prod.seller}
                </td>
              </tr>
            </table>
          </div>
        </div>
      ));
    }
  };

  const updateProds = (stud_id: number, prods: Prod[]) => {
    const tempUserList = userList.map((user) => {
      if (user.id === stud_id) {
        return {
          ...user,
          prods: prods,
        };
      }
      return user;
    });
    setUserList(tempUserList);
  };

  useEffect(() => {
    fetchUsers();
  }, [setUserList]);

  return (
    <div className="app-wrapper size-full ">
      <TopNavBar />
      <AdminNavBar />
      <div className="main-container px-4 flex flex-col gap-3 justify-cemter items-center w-full">
        <h1 className="text-center bg-gray-100 rounded-md shadow-md text-lg p-1 md:text-xl md:p-3 xl:p-5 2xl:text-2xl w-full">
          User List
        </h1>
        <div className="parent-container w-full max-w-screen overflow-x-auto shadow-lg rounded-sm">
          <table className="table-auto border-collapse w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200 w-full">
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                  STUDENT ID
                </th>
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                  NAME
                </th>
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                  AGE
                </th>
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                  CONTACT NUMBER
                </th>
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                  EMAIL
                </th>
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2 ">
                  FB LINK
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr
                  key={index}
                  className="border-t"
                  onClick={() => handleRowClick(user.id)}
                >
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                    {user.id}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                    {user.name}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                    {user.age}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                    {user.contact_num}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                    {user.email}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                    {user.fb}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderProds(activeProds)}
      </div>
    </div>
  );
};

export default ModeratorPage;
