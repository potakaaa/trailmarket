import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { Prod, useAuthContext } from "./context/AuthContext";
import AdminNavBar from "./navbar/AdminNavBar";
import TopNavBar from "./navbar/TopNavBar";

const ModeratorPage = () => {
  const { user, userList, setUserList, setProdList, prodList, setIsLoggedIn } =
    useAuthContext();
  const [activeProds, setActiveProds] = useState<Prod[]>([]);

  setIsLoggedIn(false);

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
        isBanned: user.IS_BANNED,
      }));
      setUserList(tempUserList);
      console.log("Fetched users:", tempUserList);
    }
  };

  const fetchUserPosts = async (stud_id: number) => {
    const { data, error } = await supabase
      .from("DIM_PRODUCT")
      .select("*, DIM_PRODUCTIMAGES(*)")
      .eq("SELLER_ID", stud_id);

    if (error) {
      console.error("Error fetching user posts:", error.message);
      return;
    }

    if (data) {
      const tempProdList = data.map((prod: any) => {
        const mainImage = prod.DIM_PRODUCTIMAGES?.find(
          (img: any) => img.isMainImage
        );

        return {
          id: prod.PRODUCT_ID,
          name: prod.PROD_NAME,
          price: prod.PROD_PRICE,
          condition: prod.PROD_CONDITION,
          category: prod.PROD_CATEGORY,
          stock: prod.PROD_STOCKS,
          desc: prod.PROD_DESC,
          short_desc: prod.PROD_SHORTDESC,
          img: mainImage ? mainImage.PRODUCT_IMAGE : undefined,
          seller: prod.SELLER_ID,
        };
        {
        }
      });
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

  const handleDeletePost = async (prod_id: number, prod_seller: number) => {
    const { error: deleteProductError } = await supabase
      .from("DIM_PRODUCT")
      .delete()
      .eq("PRODUCT_ID", prod_id);

    if (deleteProductError) {
      throw deleteProductError;
    }

    alert("Product deleted successfully!");
    fetchUserPosts(prod_seller);
  };

  const handleBanUser = async (stud_id: number) => {
    const { error: banUserError } = await supabase
      .from("DIM_USER")
      .update({ IS_BANNED: true })
      .eq("STUDENT_ID", stud_id);

    if (banUserError) {
      throw banUserError;
    }

    alert("User banned successfully!");
    fetchUsers();
  };

  const renderProds = (prods: Prod[]) => {
    if (prods.length === 0 || !prods) {
      return (
        <h1 className="text-center bg-gray-100 rounded-md shadow-md text-lg p-1 md:text-xl md:p-3 xl:p-5 2xl:text-2xl my-4 w-full">
          No products found
        </h1>
      );
    } else {
      return (
        <div className="w-full px-2 mb-8">
          <h1 className="text-center bg-gray-100 rounded-md shadow-md text-lg p-1 md:text-xl md:p-3 xl:p-5 2xl:text-2xl my-4">
            {activeProds[0].seller}
          </h1>

          <div className="main-container w-full max-w-screen overflow-x-auto shadow-md">
            <table className="table-auto border-collapse w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-200 w-full shadow-md">
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold px-2 py-2 text-center">
                    IMAGE
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    NAME
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    PRICE
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    CONDITION
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    CATEGORY
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    DESCRIPTION
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-center px-2 py-2">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeProds.map((prod, index) => (
                  <tr key={index} className="border-t">
                    <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3 text-center items-center justify-center flex">
                      <img
                        src={prod.img}
                        alt={prod.name}
                        className="size-14 rounded-lg m-1 border shadow-sm md:size-20 xl:size-24 2xl:size-36 object-cover"
                      />
                    </td>
                    <td className="text-xs md:text-sm xl:text-base 2xl:text-lg font-medium px-2 py-2 md:py-3 ">
                      {prod.name}
                    </td>
                    <td className="text-xs md:text-sm xl:text-base 2xl:text-lg font-medium px-2 py-2 md:py-3 ">
                      {prod.price}
                    </td>
                    <td className="text-xs md:text-sm xl:text-base 2xl:text-lg font-medium px-2 py-2 md:py-3 ">
                      {prod.condition}
                    </td>
                    <td className="text-xs md:text-sm xl:text-base 2xl:text-lg font-medium px-2 py-2 md:py-3 ">
                      {prod.category}
                    </td>
                    <td className="text-xs md:text-sm xl:text-base 2xl:text-lg font-medium px-2 py-2 md:py-3">
                      {prod.desc}
                    </td>
                    <td className="text-xs md:text-sm xl:text-base font-medium px-2 py-2 md:py-3 text-center">
                      <button
                        className="font-semibold text-xs md:text-sm xl:text-base p-2 bg-red-200 px-4 md:px-7 md:py-3 xl:px-10 xl:py-4 rounded-full shadow-md hover:bg-transparent hover:text-base md:hover:text-base xl:hover:text-lg transition-all duration-200 hover:shadow-lg"
                        onClick={() => {
                          handleDeletePost(prod.id, prod.seller);
                        }}
                      >
                        Delete Post
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
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
      <div className="main-container px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-14 flex flex-col gap-3 justify-cemter items-center w-full">
        <h1 className="text-center bg-gray-100 rounded-md shadow-md text-lg p-1 md:text-xl md:p-3 xl:p-5 2xl:text-2xl w-full">
          User List
        </h1>
        <div className="parent-container w-full max-w-screen overflow-x-auto shadow-lg rounded-sm">
          <table className="table-auto border-collapse w-full whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200 w-full shadow-md">
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
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2 ">
                  STATUS
                </th>
                <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold px-2 py-2 text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr
                  key={index}
                  className="border-t hover:shadow-lg hover:rounded-lg hover:bg-slate-100 transition duration-200"
                  onClick={() => handleRowClick(user.id)}
                >
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 md:px-3 xl:px-5 py-2 md:py-3">
                    {user.id}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 md:px-3 xl:px-5 py-2 md:py-3">
                    {user.name}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 md:px-3 xl:px-5 py-2 md:py-3">
                    {user.age}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2  md:px-3 xl:px-5 py-2 md:py-3">
                    {user.contact_num}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2  md:px-3 xl:px-5 py-2 md:py-3">
                    {user.email}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 md:px-3 xl:px-5 py-2 md:py-3">
                    {user.fb}
                  </td>
                  <td
                    className={`text-xs md:text-sm xl:text-base font-normal px-2 md:px-3 xl:px-5 py-2 md:py-3 ${
                      user.isBanned === true ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {user.isBanned ? "Banned" : "Active"}
                  </td>
                  <td className="text-xs md:text-sm xl:text-base font-normal px-2 md:px-3 xl:px-5 py-2 md:py-3 text-center">
                    <button
                      className="font-semibold text-xs md:text-sm xl:text-base p-2 bg-orange-200 px-4 md:px-7 md:py-3 xl:px-10 rounded-full shadow-md hover:bg-transparent hover:text-base md:hover:text-base xl:hover:text-lg transition-all duration-200 hover:shadow-lg"
                      onClick={() => handleBanUser(user.id)}
                    >
                      Ban User
                    </button>
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
