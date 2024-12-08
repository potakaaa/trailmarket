import TopNavBar from "./navbar/TopNavBar";
import NavBar from "./navbar/NavBar";
import { CategoryArray } from "./context/Globals";

const AdminPage = () => {
  return (
    <div className="flex flex-col">
      <TopNavBar />
      <NavBar obj={CategoryArray} />
      <div className="app-wrapper flex flex-col items-center justify-start min-h-screen w-full overflow-y-visible px-3">
        <div className="admin-page w-full space-y-2">
          <div
            className="justify-center align-center flex bg-gradient-to-r from-[#26245f] to-[#18181b]
          text-white rounded-xl p-4 w-full"
          >
            <h1 className="text-xl">Admin Page</h1>
          </div>
          <div className="main-app flex w-full flex-col justify-center space-y-2 lg:flex-row space-x-2">
            <div className="gen-info flex h-full w-full p-9 px-5 rounded-xl shadow-xl flex-col bg-gray-50 space-y-4 ">
              <div className="legend flex-row flex justify-between">
                <input type="checkbox" />
                <h2>TYPE</h2>
                <h2>PRIORITY</h2>
                <h2>ASSIGNED TO</h2>
                <h2>DESCRIPTION</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
