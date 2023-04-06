import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import "../App.css";

function SearchResults() {
  let { results, setResults } = useContext(SearchContext); // Array of podcasts
  let { loading, setLoading } = useContext(SearchContext); // Used to render loading spinner during async functions
  let { searchTerm, setSearchTerm } = useContext(SearchContext); // Used to search API, from search component input
  let { offset, setOffset } = useContext(SearchContext); // Used to determine which batch of data to return

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
      setResults((results) => [...results, ...data]); // Adds new results to results array

      setOffset((offset) => offset + 10); // Adds 10 to offset value so next search will be the next 10 results
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const moreResults = async (e) => {
    await searchPodcast(searchTerm); // Performs another search of the API using the new offset value (next batch of data)
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
            {results.map((podcast) => (
              <div
                className="card w-25 mb-5 me-5"
                id="podcast"
                key={podcast.id}
              >
                <Link to={`/episode/${podcast.id}`}>
                  <img
                    src={podcast.image}
                    className="card-img-top"
                    alt="podcast image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{podcast.title_original}</h5>
                    <p className="card-text">
                      {podcast.podcast?.title_original}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <button onClick={() => moreResults()}>See more results</button>
      </div>
    </div>
  );
}

export default SearchResults;
