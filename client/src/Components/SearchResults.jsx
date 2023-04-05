import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import "../App.css";

function SearchResults() {
  const [searchedMore, setSearchedMore] = useState(false); //Variable to conditionally render see more results button
  const [offset, setOffset] = useState(0); // Value used to tell which batch of results to return (10 at a time)
  const navigate = useNavigate();

  let { results, setResults } = useContext(SearchContext);
  let { podcasts, setPodcasts } = useContext(SearchContext);
  let { loading, setLoading } = useContext(SearchContext);
  let { searchTerm, setSearchTerm } = useContext(SearchContext);

  const searchPodcast = async (searchTerm) => {
    setLoading(true); // Set to loading
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm, offset: offset }),
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

  const moreResults = (e) => {
    let nextOffset = offset + 10;
    setOffset(nextOffset);
    searchPodcast(searchTerm);
  };

  const previousResults = (e) => {
    let previousOffset = offset - 10;
    setOffset(previousOffset);
    searchPodcast(searchTerm);
  };

  return (
    <div className="container mb-2">
      <div className="row" id="searchResults">
        {loading ? (
          <div className="spinner-border text-warning m-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div id="searchResults" className="row mt-2 justify-content-center">
            {podcasts.map((podcast) => (
              <div
                className="card w-25 mb-5 me-5"
                id="podcast"
                key={podcast.id}
              >
                <Link to={`/episode/${podcast.id}`}>
                  <img
                    src={podcast.podcast.image}
                    className="card-img-top"
                    alt="podcast image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{podcast.title_original}</h5>
                    <p className="card-text">
                      {podcast.podcast.title_original}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {offset >= 10 ? (
        <div className="text-center mt-4">
          <button onClick={previousResults}>See previous results</button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <button onClick={moreResults}>See more results</button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
