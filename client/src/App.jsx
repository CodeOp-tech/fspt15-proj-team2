import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import PodcastDetailsPage from "./Pages/PodcastDetailsPage";
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";

function App() {

  return (
    <Routes>
      <Route  path="/" element={<LandingPage />}/>
      <Route  path="/results" element={<SearchResultsPage />}/>
      <Route  path="/podcast/:id" element={<PodcastDetailsPage />}/>
      <Route  path="/episode/:id" element={<EpisodeDetailsPage />}/>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
    </Routes>
)}

export default App;
