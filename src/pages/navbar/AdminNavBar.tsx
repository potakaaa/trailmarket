import { useLocation, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const nav = useNavigate();
  const location = useLocation();

  return (
    <div className="NavBar mb-3 flex flex-col xl:flex-row 2xl:flex-row justify-center items-center  lg:px-5 2xl:px-10 w-full">
      <button
        className="NavBarLeft"
        onClick={() => {
          {
            location.pathname === "admin" ? nav("/admin") : nav("/moderator");
          }
        }}
      >
        <h1 className="NavBarTitle text-transparent bg-gradient-to-r from-[#282667] to-slate-900 bg-clip-text flex flex-col align-center justify-center md:row-span-2 sm:col-span-3 sm:text-center text-center mb-2 text-2xl sm:text-3xl md:text-4xl md:my-2 lg:my-3 xl:pl-[20px]">
          TrailMarket Admin
        </h1>
      </button>
    </div>
  );
};

export default AdminNavBar;
