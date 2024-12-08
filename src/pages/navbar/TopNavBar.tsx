import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const TopNavBar = () => {
  const nav = useNavigate();

  return (
    <div
      className="main w-full
    flex justify-between items-center
    bg-[#202020] text-white mb-3
    md:px-3
    text-[12px] lg:text-[15px]
    2xl:text-[17px]
    "
    >
      <div
        className="left
      flex gap-5 m-2.5 ml-4
      lg:ml-7 lg:gap-8 lg:m-3
      2xl:ml-16 2xl:gap-16 2xl:m-4
        "
      >
        <button
          className="
        font-normal lg:font-medium md:text-sm
        "
          onClick={() => nav("/about")}
        >
          About Us
        </button>
      </div>
      <div
        className="right
        flex gap-3 m-2 mr-4
        lg:mr-7 lg:gap-5 lg:m-3
        2xl:mr-16 2xl:gap-8 2xl:m-4
        "
      >
        <h3
          className="
        font-normal lg:font-medium md:text-sm
        "
        >
          Welcome {useAuthContext().user?.name}
        </h3>
      </div>
    </div>
  );
};

export default TopNavBar;
