import React from "react";
import { useState } from "react";

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //Function for full search with API -- not working yet. getting 404 error
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
      let results = await fetch(`/search`, options);
      //   console.log(results);
      //   let data = await results.json(); // Error: SyntaxError: Unexpected end of JSON input
      //   console.log(data);
      //   return data;

      console.log(results);
      return results;
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPodcast(searchTerm);
    console.log(searchTerm); //Working
    setSearchTerm("");
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
