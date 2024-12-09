import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import TopNavBar from "./navbar/TopNavBar";
import { CategoryArray } from "./context/Globals";
import SearchResults from "./SearchResults";
import { useAuthContext } from "./context/AuthContext";

const MainLayout = () => {
  const { searchState } = useAuthContext();
  return (
    <div className="main-layout">
      <TopNavBar />
      <NavBar obj={CategoryArray} />
      <div className="content">
        {searchState ? <SearchResults /> : <Outlet />}
      </div>
    </div>
  );
};

export default MainLayout;
