import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  //Function for full search with API
  const searchPodcast = async (searchTerm) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    };
    try {
      let results = await fetch(`/api/search`, options);
      let data = await results.json();
      console.log(data);
      setResults(data);
      setLoading(false);
      return results; // Returns array of 10 podcast episodes that meet search criteria
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    searchPodcast(searchTerm);
    setSearchTerm("");
    navigate("/results"); //This page needs to be set up in the router area.
  };

  return (
    <div id="searchArea" className="container">
      <div className="row">
        <div id="searchBox" className="offset-md-3 col-md-6 mb-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="form-label">
              <h3>Search for a podcast</h3>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. My favorite podcast"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button className="btn">Search</button>
          </form>
        </div>
      </div>
      <div className="row" id="searchResults">
        {loading ? (
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div id="searchResults" className="row mt-2">
            {results.map((podcast) => (
              <div
                className="col-lg-4 col-md-6 col-12 ps-3 pe-3 mt-3"
                id="podcast"
                key={podcast.id}
              >
                <h5>{podcast.title_original}</h5>
                <img src={podcast.podcast.image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Search;
