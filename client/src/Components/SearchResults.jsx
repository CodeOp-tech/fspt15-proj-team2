import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";

function SearchResults() {
  const [searchedMore, setSearchedMore] = useState(false); //Variable to conditionally render see more results button
  const navigate = useNavigate();

  let { results, setResults } = useContext(SearchContext);
  let { loading, setLoading } = useContext(SearchContext);
  let { searchTerm, setSearchTerm } = useContext(SearchContext);

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

  // FUNCTION TO RETURN NEXT 10 RESULTS FROM API -- SEE MORE RESULTS
  const searchPodcastMore = async (searchTerm) => {
    setLoading(true); // Set to loading
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    };
    try {
      let results = await fetch(`/api/search/more`, options);
      let data = await results.json(); // Getting an error here.
      console.log(data);
      setResults(data);
      setLoading(false);
      setSearchedMore(true); // Makes see more results button disappear
      return results;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    searchPodcastMore(searchTerm);
  };

  const previousResults = (e) => {
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
          <div id="searchResults" className="row mt-2">
            {results.map((podcast) => (
              <div
                className="col-lg-4 col-md-6 col-12 ps-3 pe-3 mt-3 mb-4"
                id="podcast"
                key={podcast.id}
              >
                <Link to={`/episode/${podcast.id}`}>
                  <h5 className="text-center mb-3">{podcast.title_original}</h5>
                  <img
                    src={podcast.podcast.image}
                    className="rounded mx-auto d-block col-8"
                  />
                  <h6 className="text-center mt-3">
                    {podcast.podcast.title_original}
                  </h6>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {searchedMore ? (
        <div className="text-center mt-4">
          <button onClick={previousResults}>See previous results</button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <button onClick={handleClick}>See more results</button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
