import React from "react";
import SignOrLoginPage from "./pages/SignOrLogPage";

import "./App.css";

const App = () => {
  return (
    <div
      id="container"
      className="size-full flex 
    justify-center items-center absolute top-[50%]
    transform translate-y-[-50%]"
    >
      <SignOrLoginPage />
    </div>
  );
};

export default App;
