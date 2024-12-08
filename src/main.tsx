import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext"; // Import the AuthProvider

import App from "./App";
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
import Product from "./pages/Product";
import CheckoutPage from "./pages/CheckoutPage";

const router = createHashRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <App />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "home",
        element: <HomePage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "navbar2",
        element: <TopNavBar />,
      },
      {
        path: "about",
        element: <AboutUs />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "contact-us",
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "profile",
        element: <SellerPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "myprofile",
        element: <SellerPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "search",
        element: <SearchResults />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "post",
        element: <ProductPost />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "cart",
        element: <CartPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "checkout",
        element: <CheckoutPage cartItems={[]} />,
        errorElement: <div>404 Not Found</div>,
      }
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
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
    element: <ProductPage />,
  },
  {
    path: "/navbar2",
    element: <TopNavBar />,
  },

  {
    path: "/about",
    element: <AboutUs />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/contact-us",
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/profile",
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/myprofile",
    element: <SellerPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/myprofile",
    element: <SellerPage />,
    errorElement: <div>404 Not Found</div>,
  }, 
  {
    path: "/product",
    element: <Product name="Sample Product" price={0} stock={0} imageUrl="" />,
    errorElement: <div>404 Not Found</div>,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
