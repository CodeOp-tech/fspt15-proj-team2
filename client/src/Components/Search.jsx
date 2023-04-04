import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../SearchContext";
import "../App.css";

function Search() {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [results, setResults] = useState([]);

  let { results, setResults } = useSearchContext();
  let { loading, setLoading } = useSearchContext();
  let { searchTerm, setSearchTerm } = useSearchContext();

  //Function for full search with API
  const searchPodcast = async (searchTerm) => {
    setLoading(true); // Set to loading
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

    // setSearchTerm("");
    navigate("/results"); //Go to results page upon submission -- results rendered in results page
  };

  return (
    <div id="searchArea" className="container mt-3 mb-2">
      <div className="row mt-5">
        <div id="searchBox" className="offset-md-3 col-md-6 mb-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="form-label">
              <h3>Explore podcast episodes</h3>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. dinosaurs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="row mt-3 w-50 m-auto">
              <button>Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Search;
