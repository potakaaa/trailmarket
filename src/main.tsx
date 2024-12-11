import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext"; // Import the AuthProvider

import SignOrLoginPage from "./pages/login_signup/SignOrLoginPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import TopNavBar from "./pages/navbar/TopNavBar";
import UserPage from "./pages/UserPage";
import AboutUs from "./pages/AboutUs";
import PrivateRoute from "./pages/context/PrivateRoute";
import SearchResults from "./pages/SearchResults";
import ProductPost from "./pages/ProductPost";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import App from "./App";
import NotFound404 from "./pages/NotFound404";
import AdminPrivateRoute from "./pages/context/PrivateRouteAdmin";
import ModeratorPage from "./pages/ModeratorPage";
import MyProfileRedirect from "./pages/MyProfileRedirect";

const router = createHashRouter([
  {
    path: "/",
    element: <PrivateRoute />, // Private route for general pages
    errorElement: <NotFound404 />,
    children: [
      {
        path: "",
        element: <App />,
        errorElement: <div>404 Not Found</div>,
        children: [
          {
            path: "",
            element: <HomePage />,
            errorElement: <div>404 Not Found</div>,
          },
          {
            path: "home",
            element: <HomePage />,
            errorElement: <div>404 Not Found</div>,
          },
          {
            path: "product/:id",
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
            path: "profile/:userId",
            element: <UserPage />,
            errorElement: <div>404 Not Found</div>,
          },
          {
            path: "myprofile",
            element: <MyProfileRedirect />,
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
            element: <CheckoutPage />,
            errorElement: <div>404 Not Found</div>,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AdminPrivateRoute>
        <AdminPage />
      </AdminPrivateRoute>
    ),
    errorElement: <NotFound404 />,
  },
  {
    path: "moderator",
    element: (
      <AdminPrivateRoute>
        <ModeratorPage />
      </AdminPrivateRoute>
    ),
    errorElement: <NotFound404 />,
  },
  {
    path: "login",
    element: <SignOrLoginPage />,
    errorElement: <NotFound404 />,
  },
  {
    path: "adminlogin",
    element: <SignOrLoginPage />,
    errorElement: <NotFound404 />,
  },
  {
    path: "signup",
    element: <SignOrLoginPage />,
    errorElement: <NotFound404 />,
  },
  {
    path: "forget",
    element: <SignOrLoginPage />,
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
