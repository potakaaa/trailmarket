import { useContext, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./pages/context/AuthContext";

const App = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { isLoggedIn } = context;
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
