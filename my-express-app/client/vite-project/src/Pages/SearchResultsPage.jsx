import React from "react";
import Navbar from "../Components/Navbar.jsx";

function SearchResultsPage() {
    return (
        <div className="search-results-page">
            <Navbar/>
            <button>Back to search</button>
            <h2>Search Results</h2>
        </div>
    )
}

export default SearchResultsPage;