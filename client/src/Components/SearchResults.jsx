import React from "react";
import { useState } from "react";
import { SearchContext } from "../SearchContext";

function SearchResults() {
  let { results, setResults } = useContext(SearchContext);
  return (
    <div className="container">
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

export default SearchResults;
