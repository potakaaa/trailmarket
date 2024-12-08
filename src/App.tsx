import { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./pages/context/AuthContext";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    // Redirect based on `isLoggedIn` state
    if (isLoggedIn) {
      nav("/home"); // Redirect to home
    } else {
      nav("/login"); // Redirect to login
    }
  }, [isLoggedIn, nav]);

  return <div id="container" className=""></div>;
};

export default App;
