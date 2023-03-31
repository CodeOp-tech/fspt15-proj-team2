import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { SearchContext } from "./SearchContext";
import SearchResultsPage from "./Pages/SearchResultsPage";
import PodcastDetailsPage from "./Pages/PodcastDetailsPage";
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";

function App() {
  return (
    <Routes>
      <SearchContext.Provider value={results}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<SearchResultsPage />} />
        <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
        <Route path="/episode/:id" element={<EpisodeDetailsPage />} />
      </SearchContext.Provider>
    </Routes>
  );
}

export default App;
