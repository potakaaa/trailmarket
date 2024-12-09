import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext"; // Import the AuthProvider

import SignOrLoginPage from "./pages/login_signup/SignOrLoginPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import TopNavBar from "./pages/navbar/TopNavBar";
import SellerPage from "./pages/SellerPage";
import AboutUs from "./pages/AboutUs";
import PrivateRoute from "./pages/context/PrivateRoute";
import SearchResults from "./pages/SearchResults";
import ProductPost from "./pages/ProductPost";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import App from "./App";
import NotFound404 from "./pages/NotFound404";

const router = createHashRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "home",
            element: <HomePage />,
            errorElement: <NotFound404 />,
          },
          {
            path: "product",
            element: <ProductPage />,
          },
          {
            path: "about",
            element: <AboutUs />,
            errorElement: <NotFound404 />,
          },
          {
            path: "contact-us",
            errorElement: <NotFound404 />,
          },
          {
            path: "profile",
            element: <SellerPage />,
            errorElement: <NotFound404 />,
          },
          {
            path: "myprofile",
            element: <SellerPage />,
            errorElement: <NotFound404 />,
          },
          {
            path: "search",
            element: <SearchResults />,
            errorElement: <NotFound404 />,
          },
          {
            path: "post",
            element: <ProductPost />,
            errorElement: <NotFound404 />,
          },
          {
            path: "cart",
            element: <CartPage />,
            errorElement: <NotFound404 />,
          },
          {
            path: "checkout",
            element: <CheckoutPage cartItems={[]} />,
            errorElement: <NotFound404 />,
          },
          {
            path: "/product",
            element: <ProductPage />,
          },
          {
            path: "/product/:id",
            element: <ProductPage />,
            errorElement: <NotFound404 />,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    errorElement: <NotFound404 />,
  },

  {
    path: "/login",
    element: <SignOrLoginPage />,
    errorElement: <NotFound404 />,
  },
  {
    path: "/signup",
    element: <SignOrLoginPage />,
    errorElement: <NotFound404 />,
  },
  {
    path: "/forget",
    element: <SignOrLoginPage />,
    errorElement: <NotFound404 />,
  },

  {
    path: "/navbar2",
    element: <TopNavBar />,
    errorElement: <NotFound404 />,
  },

  {
    path: "/about",
    element: <AboutUs />,
    errorElement: <NotFound404 />,
  },
  {
    path: "/contact-us",
    errorElement: <NotFound404 />,
  },
  {
    path: "/profile",
    errorElement: <NotFound404 />,
  },
  {
    path: "/myprofile",
    element: <SellerPage />,
    errorElement: <NotFound404 />,
  },
  {
    path: "/myprofile",
    element: <SellerPage />,
    errorElement: <NotFound404 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
