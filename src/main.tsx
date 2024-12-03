import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import SignOrLoginPage from "./pages/login_signup/SignOrLoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ForgetPass from "./pages/login_signup/ForgetPass.tsx";
import ProductPage from "./pages/ProductPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <SignOrLoginPage />,
  },
  {
    path: "/signup",
    element: <SignOrLoginPage />,
  },
  {
    path: "/forget",
    element: <SignOrLoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/product",
    element: <ProductPage/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
