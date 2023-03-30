import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import PodcastDetailsPage from "./Pages/PodcastDetailsPage";
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>, 
      errorElement: <ErrorPage/>
    }, 
    {
      path: "results",
      element: <SearchResultsPage/>, 
    }, 
    {
      path: "podcast",
      element: <PodcastDetailsPage/>, 
    }, 
    {
      path: "episodes",
      element: <EpisodeDetailsPage/>
    }
  ])

  return (
    <RouterProvider router={router}/>
)}

export default App;
