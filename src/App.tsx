import { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./pages/context/AuthContext";
import { fetchCategories } from "./pages/context/Globals";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/navbar/NavBar";
import TopNavBar from "./pages/navbar/TopNavBar";
import { CategoryArray } from "./pages/context/Globals";
import SearchResults from "./pages/SearchResults";
import LoadingSpinner from "./pages/Loader/LoadingSpinner";

const App = () => {
  const { isLoggedIn, searchState, isLoading } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    fetchCategories();
    if (isLoggedIn) {
      nav("/home"); // Redirect to home
    } else {
      nav("/login"); // Redirect to login
    }
  }, [isLoggedIn, nav]);

  return (
    <div className="main-layout">
      {isLoading && <LoadingSpinner />}
      <TopNavBar />
      <NavBar obj={CategoryArray} />
      <div className="content">
        {searchState ? <SearchResults /> : <Outlet />}
      </div>
    </div>
  );
};

export default App;
