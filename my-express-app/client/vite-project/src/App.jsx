import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import PodcastDetailsPage from "./Pages/PodcastDetailsPage";
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="search" element={<SearchResultsPage/>}/>
        <Route path="episode" element={<EpisodeDetailsPage/>}/>
        <Route path="podcast" element={<PodcastDetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
