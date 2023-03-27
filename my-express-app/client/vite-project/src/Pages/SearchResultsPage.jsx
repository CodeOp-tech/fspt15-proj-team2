import React from "react";
import { useState } from "react";
import Search from "../Components/Search";
import SearchResults from "../Components/SearchResults";

function SearchResultsPage({ sendSearchTermCB }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container">
      <Search />
      <SearchResults sendSearchTermCB={searchTerm} />
    </div>
  );
}

export default SearchResultsPage;
