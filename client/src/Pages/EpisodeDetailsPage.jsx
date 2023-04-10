import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Player from "../components/Player";
import { SearchContext } from "../SearchContext";
import "./EpisodeDetailsPage.css";

function EpisodeDetails({setUrl, setShowPlayer}) {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this podcast episode id is in the database & can be used to search API
  let { results, setResults } = useContext(SearchContext);
  const [episodeData, setEpisodeData] = useState([]);
  const dateObject = new Date(episodeData.pub_date_ms);
  const [checked, setChecked] = useState(false);
  const seconds = episodeData.audio_length_sec;
 

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
    setUrl(`${episodeData.listennotes_url}/embed`);
    setShowPlayer(true);
  }, [episodeData]);

  // Right now, all results are being rendered here. Just thinking about how we could get just the data for the target episode:
  // Option 1: Loop through the results and just render the data from the episode with the matching id (podcast.id).
  // Option 2: Use a function to fetch the data for just that one episode using the episode id.
  // I'd prefer to do the first option to avoid fetching so much, but 🤷‍♀️

  // function addToPlaylist() {
  //   console.log("go");
  // }

  function convertSecondstoMinutes(seconds) {
    let minutes = ~~(seconds / 60);
    let extraSeconds = seconds % 60;
    return (minutes + " : " + extraSeconds );
 }

 return (
  <div className="episode-details-container">
    <Navbar />
    {/* This link should keep the results from the previous search -- maybe refetch the data? 
    Or store it locally? Or use onClick with this button to render it in the search results somehow...
    not sure yet.*/}
    <div className="body">
      <Link to="/results">
        <button className="results-btn btn btn-primary mt-2">
          Back to search results
        </button>
      </Link>

      {/* This div renders the episode data -- right now, it's rendering all the results data */}
      <div id="container" className="row mt-2">
        <div className="episode-title">
          <h2 className="text-center col-md-6 offset-3">{episodeData.title_original}</h2>
          <h4 className="text-center col-md-6 offset-3"><span className="podcast-title"> {episodeData.podcast?.title_original} </span></h4>
        </div>
        <div className="episode-details justify-content-center mt-4">
          <div className="episode-info">
          <img
            src={episodeData.image}
            className="episode-img col-2 w-25 rounded"
          />
          <div>
            <div className="ep-info">
              {!checked && <button  className="fav-btn mb-2" onClick={() => setChecked(true)}><span className="material-symbols-outlined down">heart_plus</span><span> Add to favorites</span></button>}
              { checked && <button  className="rem-btn"onClick={() => setChecked(false)}><span className="material-symbols-outlined down">favorite</span><span> Remove from favorites</span></button>} <br/>
              <span className="bold spaced-line release">Release Date: </span>
              <span>{dateObject?.toUTCString().slice(0, 16)}</span> <br/>
              <span className="bold spaced-line">Duration: </span>
              <span>{convertSecondstoMinutes(seconds)}</span> <br/>
              <span className="bold spaced-line">Rating: </span>
              {!episodeData.explicit_content && <span>Clean</span>} 
              {episodeData.explicit_content && <span>Explicit</span>} 
             </div>
          </div>
          </div>
          <div
              className="episode-desc col-6"
              dangerouslySetInnerHTML={{
                __html: episodeData.description_original,
              }}
            />
        </div>
      </div>
    </div>
  </div>
);
}

export default EpisodeDetails;
