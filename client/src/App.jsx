import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
// import PodcastDetailsPage from "./Pages/PodcastDetailsPage"; //We don't need this in this iteration of the project.
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";
import { SearchContext } from "./SearchContext";

function App() {
  let { results } = useContext(SearchContext); // Getting error here saying results is undefined.
  // Do we need this here? Without anything, the results value in the provider below was undefined. Not sure.

  return (
    <SearchContext.Provider value={results}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<SearchResultsPage />} />
        {/* <Route path="/podcast/:id" element={<PodcastDetailsPage />} /> */}
        <Route path="/episode/:id" element={<EpisodeDetailsPage />} />
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
