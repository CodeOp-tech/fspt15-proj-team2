import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SearchContext } from "../SearchContext";

function EpisodeDetails() {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this podcast episode id is in the database & can be used to search API
  let { results, setResults } = useContext(SearchContext);
  const [episodeData, setEpisodeData] = useState([]);

  const getEpisodeDetails = (results) => {
    for (let episode of results) {
      if (episode.id === ID) {
        console.log({ episode });
        setEpisodeData(episode);
        return;
      }
    }
  };

  useEffect(() => {
    getEpisodeDetails(results); // Pulls episode details from full results
  }, []);

  // Right now, all results are being rendered here. Just thinking about how we could get just the data for the target episode:
  // Option 1: Loop through the results and just render the data from the episode with the matching id (podcast.id).
  // Option 2: Use a function to fetch the data for just that one episode using the episode id.
  // I'd prefer to do the first option to avoid fetching so much, but 🤷‍♀️

  return (
    <div className="episode-details-container">
      <Navbar />
      {/* This link should keep the results from the previous search -- maybe refetch the data? 
      Or store it locally? Or use onClick with this button to render it in the search results somehow...
      not sure yet.*/}
      <Link to="/results">
        <button className="btn btn-primary mt-2">Back to search results</button>
      </Link>

      {/* This div renders the episode data -- right now, it's rendering all the results data */}
      <div id="container" className="row mt-2">
        <h2 className="text-center">Episode Details Go Here!</h2>
        <h3>{episodeData.title_original}</h3>
      </div>
    </div>
  );
}

export default EpisodeDetails;
