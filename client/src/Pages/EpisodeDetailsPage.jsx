import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { SearchContext } from "../SearchContext";
import "./EpisodeDetailsPage.css";

function EpisodeDetails() {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this podcast episode id is in the database & can be used to search API
  let { results, setResults } = useContext(SearchContext);
  const [episodeData, setEpisodeData] = useState([]);
  const url = `${episodeData.listennotes_url}/embed`;

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
      <div className="body">
        <Link to="/results">
          <button className="btn btn-primary mt-2">
            Back to search results
          </button>
        </Link>

        {/* This div renders the episode data -- right now, it's rendering all the results data */}
        <div id="container" className="row mt-2">
          <div className="episode-title">
            <h2 className="text-center">{episodeData.title_original}</h2>
            {/* <h4 className="text-center">From the <span className="podcast-title"> {episodeData.podcast.title_original} </span>Podcast</h4> */}
          </div>
          <div className="episode-details justify-content-center mt-4">
            <img
              src={episodeData.image}
              className="episode-img col-2 w-25 rounded"
            />
            {/* to render HTMl string as true html */}
            <div
              className="episode-desc col-6"
              dangerouslySetInnerHTML={{
                __html: episodeData.description_original,
              }}
            />
          </div>
          {/* material symbols for when we create add to playlist functionality - currently white */}
          {/* <span className="material-symbols-outlined ">playlist_add</span>
        <span className="material-symbols-outlined">playlist_add_check</span>
        <span className="material-symbols-outlined">playlist_remove</span> */}
        </div>
      </div>
      <Player url={url} />
    </div>
  );
}

export default EpisodeDetails;
