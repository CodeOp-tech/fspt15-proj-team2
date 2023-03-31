import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../SearchContext";

function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [results, setResults] = useState([]);

  // FROM THE COFFEE DEMO -- NEEDS TO BE UDPATED
  let { results, setResults } = useSearchContext();

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
    navigate("/results"); //Go to results page upon submission -- results rendered in results page
  };

  return (
    <div id="searchArea" className="container mt-3">
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
            <div className="row mt-3 w-50 m-auto">
              <button className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Search;
