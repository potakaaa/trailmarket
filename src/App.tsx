import React from "react";
import SignOrLoginPage from "./pages/SignOrLoginPage";
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import "./App.css";
import ProductPage from "./pages/ProductPage";


const App = () => {
  return (
    <div
      id="container"
      className="size-full flex 
    justify-center items-center absolute top-[50%]
    transform translate-y-[-50%]"
    >
      <ProductPage/>
    </div>
  );
};

export default App;
