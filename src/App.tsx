import React from "react";
import SignOrLoginPage from "./pages/SignOrLoginPage";
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import ForgetPass from "./pages/ForgetPass";


const App = () => {
  return (
    <div id="container" className="size-full ">
      <SignOrLoginPage />
    </div>
  );
};

export default App;
