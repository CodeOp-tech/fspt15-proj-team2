import React from "react";
import Navbar from "../components/Navbar";
import SearchResults from "../Components/SearchResults";
import { Link } from "react-router-dom";

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
