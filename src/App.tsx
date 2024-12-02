import React from "react";
import SignOrLoginPage from "./pages/SignOrLogPage";
import NavBar from "./pages/NavBar";
import "./App.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <div id="container" className="container-fluid">
        <SignOrLoginPage />
      </div>
    </div>
  );
};

export default App;
