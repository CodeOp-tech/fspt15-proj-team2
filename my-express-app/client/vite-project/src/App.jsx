import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useRouteError } from "react-router-dom";
import "./App.css";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import SearchResultsPage from "./Pages/SearchResultsPage";

function App() {
  return (
  
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} errorElement={<ErrorPage/>}/>
          <Route path="search" element={<SearchResultsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
