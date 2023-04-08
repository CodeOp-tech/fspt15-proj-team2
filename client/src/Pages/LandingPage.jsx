import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
// import Player from "../components/Player";
import Search from "../Components/Search";
// import Favorites from "../components/Favorites";
// import Recommended from "../components/Recommended";

function LandingPage() {
  return (
    <div className="app">
      <Navbar />
      <div className="hero">
        <div className="hero-inner">
        <h1 className="hero-title">Discover and enjoy podcasts</h1>
        <Search />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
