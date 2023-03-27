import React, { useState } from "react";
import hero from "./pexels-cottonbro-studio-6686442.jpg"

import "./App.css"; // This file is empty currently.
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar/>
        <img className="hero-img" src={hero} height="800px" width="1200px"/>
        <h1>Find and enjoy the right podcast for you. </h1>
        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio diam, tincidunt non tortor et, interdum gravida orci. Integer lectus felis, finibus a velit sed, pharetra sollicitudin libero. Sed vitae pulvinar ligula. </h6>
        <div>Search bar</div>
      </div>
    </div>
  );
}

export default App;
