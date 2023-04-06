import React from "react";
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import SearchResults from "../Components/SearchResults";
import Search from "../Components/Search";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";

function SearchResultsPage() {
  let { searchTerm, setSearchTerm } = useContext(SearchContext);

  // To reset the searchTerm field
  const reset = (e) => {
    setSearchTerm("");
  };

  return (
    <div className="search-results-page">
      <Navbar />
      <div className="container  pt-5">
        <Link to="/" onClick={reset}>
          <p className="mt-5"> Back to home page</p>
        </Link>
        <div className="container">
          <Search />
          {searchTerm ? <SearchResults /> : null}
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
