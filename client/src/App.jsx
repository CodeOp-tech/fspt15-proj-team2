import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
// import PodcastDetailsPage from "./Pages/PodcastDetailsPage"; //We don't need this in this iteration of the project.
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";
import SearchContextProvider from "./SearchContext";
import Player from "./Components/Player";

function App() {
  const [url, setUrl] = useState("");

  return (
    <SearchContextProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<SearchResultsPage />} />
        {/* <Route path="/podcast/:id" element={<PodcastDetailsPage />} /> */}
        <Route path="/episode/:id" element={<EpisodeDetailsPage setUrl={setUrl}/>} />
      </Routes>
      {<Player url={url}/>}
    </SearchContextProvider>
  );
}

export default App;
