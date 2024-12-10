import "./App.css";
import { useAuthContext } from "./pages/context/AuthContext";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/navbar/NavBar";
import TopNavBar from "./pages/navbar/TopNavBar";
import { CategoryArray } from "./pages/context/Globals";
import SearchResults from "./pages/SearchResults";
import LoadingSpinner from "./pages/Loader/LoadingSpinner";

const App = () => {
  const { searchState, isLoading } = useAuthContext();

  return (
    <div className="main-layout size-screen h-screen justify-center items-center">
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
