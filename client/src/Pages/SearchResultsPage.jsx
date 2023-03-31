import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route, Link } from "react-router-dom";

function SearchResultsPage() {
  return (
    <div className="search-results-page">
      <Navbar />
      <Link to="/">
        <button>Back to search</button>
      </Link>
      <div className="container">
        <Search />
        <SearchResults />
      </div>
    </div>
  );
}

export default SearchResultsPage;
