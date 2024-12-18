import "./App.css";
import { useAuthContext } from "./pages/context/AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./pages/navbar/NavBar";
import AdminNavBar from "./pages/navbar/AdminNavBar";
import TopNavBar from "./pages/navbar/TopNavBar";
import { CategoryArray } from "./pages/context/Globals";
import SearchResults from "./pages/SearchResults";
import LoadingSpinner from "./pages/Loader/LoadingSpinner";
import { useEffect } from "react";

const App = () => {
  const { searchState, isLoading, setCheckoutProds } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/checkout") {
      setCheckoutProds([]);
    }
  }, [location]);

  return (
    <div className="main-layout size-screen h-screen justify-center items-center">
      {isLoading && <LoadingSpinner />}
      <TopNavBar />
      {location.pathname === "/admin" ? (
        <AdminNavBar />
      ) : (
        <NavBar obj={CategoryArray} />
      )}
      <div className="content">
        {searchState ? <SearchResults /> : <Outlet />}
      </div>
    </div>
  );
};

export default App;
