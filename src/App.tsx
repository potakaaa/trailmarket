import React from "react";
import SignOrLoginPage from "./pages/login_signup/SignOrLoginPage";
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import ForgetPass from "./pages/login_signup/ForgetPass";

const App = () => {
  return (
    <div id="container" className="">
      <SignOrLoginPage />
    </div>
  );
};

export default App;
