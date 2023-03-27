import React from "react";
import { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  //Function for full search with API
  const searchPodcast = async (searchTerm) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    };
    try {
      let results = await fetch(`/search`, options);
      //   let data = await results.json();
      //   return data;
      console.log(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPodcast(searchTerm);
    // setSearchTerm("");
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
