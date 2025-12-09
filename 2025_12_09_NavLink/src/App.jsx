import React from "react";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const router = createBrowserRouter([
  // nyilvános útvonalak  
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  // védett útvonalak
  {
    path: "/",
    element: <Layout />,
    middleware: [], // még nincs kész!
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />
      },
    ]      
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
 )
}