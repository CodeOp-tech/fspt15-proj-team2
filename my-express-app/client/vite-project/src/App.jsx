import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from './components/Navbar';
import Player from './components/Player';
import Footer from './components/Footer';
import Search from './components/Search';

function App() {
  return (
    <div className="app">
      <div>
        <Navbar/>
        <div className="hero-container">
          <h1 className="hero-title">Podcast slogan. </h1>
          <h4 className="hero-subtitle">Discover and enjoy podcasts.</h4>
        </div>
        <p>Favorites</p>
        <p>Recommended</p>
        <Search />
      </div>
      <Player/>
      <Footer/>
    </div>
  );
}

export default App;
