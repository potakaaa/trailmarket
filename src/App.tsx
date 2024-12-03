import React, { useEffect, useState } from "react";
import SignOrLoginPage from "./pages/login_signup/SignOrLoginPage";
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import ForgetPass from "./pages/login_signup/ForgetPass";
import LoginPage from "./pages/login_signup/LoginPage";
import { useNavigate } from "react-router-dom";
import { Sign } from "crypto";

const App = () => {
  return (
    <div id="container">
      <HomePage />
    </div>
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
