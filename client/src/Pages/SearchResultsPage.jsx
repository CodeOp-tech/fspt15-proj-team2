import React from "react";
import Navbar from "../Components/Navbar.jsx";
import {Routes, Route, Link} from "react-router-dom";

function SearchResultsPage() {
    return (
        <div className="search-results-page">
            <Navbar/>
            <Link to="/"><button>Back to search</button></Link>
            <h2>Search Results</h2>
        </div>
    )
}

export default SearchResultsPage;