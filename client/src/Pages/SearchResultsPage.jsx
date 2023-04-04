import React from "react";
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import SearchResults from "../Components/SearchResults";
import Search from "../Components/Search";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";

function SearchResultsPage() {
  return (
    <div className="search-results-page">
      <Navbar />
      <div className="container  pt-5">
        <Link to="/">
          <p className="mt-5"> Back to home page</p>
        </Link>
        <div className="container">
          <Search />
          <SearchResults />
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
