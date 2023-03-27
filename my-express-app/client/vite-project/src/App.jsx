import React, { useState } from "react";
import "./App.css"; // This file is empty currently.
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar/>
        <div className="hero-container">
          <h1 className="hero-title">Podcast slogan. </h1>
          <h4 className="hero-subtitle">Discover and enjoy podcasts.</h4>
        </div>
        <div>Search bar goes here</div>
        <p>Favorites</p>
        <p>Recommended</p>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
