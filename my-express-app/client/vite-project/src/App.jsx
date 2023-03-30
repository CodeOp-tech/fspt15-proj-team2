import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", 
      element: <LandingPage/>,
      errorElement: <ErrorPage/>
    }, 
    {
      path: "search", 
      element: <SearchResultsPage/>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
