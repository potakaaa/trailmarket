import React from "react";
import SignOrLoginPage from "./pages/SignOrLoginPage";
import NavBar from "./pages/NavBar";
import "./App.css";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div id="container" className="size-full ">
      <SignOrLoginPage />
    </div>
  );
};

export default App;
