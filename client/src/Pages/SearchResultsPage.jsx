import React from "react";
import Navbar from "../components/Navbar";
import SearchResults from "../Components/SearchResults";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";

function SearchResultsPage() {
  let { results, setResults } = useContext(SearchContext);
  return (
    <div className="search-results-page container">
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
