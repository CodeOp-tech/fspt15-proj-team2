import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
// import Player from "../components/Player";
import Search from "../Components/Search";
import hero from "../Images/hero.jpg"
import hero2 from "../Images/hero2.jpg"
// import Favorites from "../components/Favorites";
// import Recommended from "../components/Recommended";

function LandingPage() {
  return (
    <div className="app">
      <Navbar />
      <div className="hero-container">
        <img className="hero-img" src={hero}/>
        <h4 className="hero-title">Discover and enjoy podcasts</h4>
      </div>
      <Search />
    </div>
  );
}

export default LandingPage;
