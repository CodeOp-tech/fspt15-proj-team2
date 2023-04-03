import React from "react";
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import SearchResults from "../Components/SearchResults";
import Search from "../Components/Search";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";

function SearchResultsPage() {
  // const [loading, setLoading] = useState(false);
  // let { results, setResults } = useContext(SearchContext);
  return (
    <div className="search-results-page">
      <Navbar />
      <div className="container">
        <Link to="/">
          <button className="btn btn-primary mt-2">Back to home page</button>
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
