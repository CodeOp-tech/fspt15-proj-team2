import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../SearchContext";
import "../App.css";

function Search() {
  const navigate = useNavigate();
  const [missingSearchTerm, setMissingSearchTerm] = useState(false);

  let { results, setResults } = useSearchContext();

  let { loading, setLoading } = useSearchContext();
  let { searchTerm, setSearchTerm } = useSearchContext();
  let { offset, setOffset } = useSearchContext();

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
      console.log(results);
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
    if (searchTerm) {
      setSearchTerm(searchTerm);
      searchPodcast(searchTerm);
      setMissingSearchTerm(false);
      setOffset((offset) => offset + 10);
      navigate("/results");
    } else {
      setMissingSearchTerm(true);
    }
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
          {missingSearchTerm ? (
            <div classaName="row">
              <h4 className="mt-4 text-center">
                Please enter a topic you'd like to hear about
              </h4>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Search;
