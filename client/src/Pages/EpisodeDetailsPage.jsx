import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
// import Player from "../components/Player";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import UserContext from "../UserContext";
import "./EpisodeDetailsPage.css";

function EpisodeDetails({ setUrl, setShowPlayer }) {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this podcast episode id is in the database & can be used to search API
  let { results, setResults } = useContext(SearchContext);

  const [episodeData, setEpisodeData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [hideListenButton, setHideListenButton] = useState(false);

  const dateObject = new Date(episodeData.pub_date_ms);
  const navigate = useNavigate();
  const auth = useContext(UserContext);

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
  }, [episodeData]);

  // function addToPlaylist() {
  //   console.log("go");
  // }

  function playEpisode() {
    setUrl(`${episodeData.listennotes_url}/embed`);
    setShowPlayer(true);
    setHideListenButton(true);
  }

  async function addToFavorites() {
    if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      try {
        let body = {
          id: episodeData.id,
          // user_id: userID,
        };
        let options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };
        let results = await fetch("/users/favorites", options);
        let data = await results.json();
        // to change button
        setChecked(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function removeFromFavorites(id) {
    try {
      let options = {
        method: "DELETE",
      };
      let results = await fetch(`/users/favorites/${id}`, options);
      let data = await results.json();
      // to change button
      setChecked(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
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
            <h2 className="text-center col-md-6 offset-3">
              {episodeData.title_original}
            </h2>
            <h4 className="text-center col-md-6 offset-3">
              <span className="podcast-title">
                {" "}
                {episodeData.podcast?.title_original}{" "}
              </span>
            </h4>
          </div>
          <div className="episode-details justify-content-center mt-4">
            <div className="episode-info">
              <img
                src={episodeData.image}
                className="episode-img col-2 w-50 rounded"
              />
              <div>
                {episodeData.title_original && (
                  <div className="ep-info">
                    {!hideListenButton && (
                      <button
                        className="fav-btn mb-3"
                        onClick={() => playEpisode()}
                      >
                        <span className="material-symbols-outlined down ">
                          play_arrow
                        </span>
                        <span> Listen </span>
                      </button>
                    )}{" "}
                    <br />
                    {!checked && (
                      <button
                        className="fav-btn mb-2"
                        onClick={() => addToFavorites()}
                      >
                        <span className="material-symbols-outlined down">
                          heart_plus
                        </span>
                        <span> Add to favorites</span>
                      </button>
                    )}
                    {checked && (
                      <button
                        className="rem-btn mb-2"
                        onClick={() => removeFromFavorites(episodeData.id)}
                      >
                        <span className="material-symbols-outlined down">
                          favorite
                        </span>
                        <span> Remove from favorites</span>
                      </button>
                    )}{" "}
                    <br />
                    <span className="bold spaced-line release">
                      Release Date:{" "}
                    </span>
                    <span>{dateObject?.toUTCString().slice(4, 16)}</span> <br />
                    <span className="bold spaced-line">Rating: </span>
                    {!episodeData.explicit_content && <span>Clean</span>}
                    {episodeData.explicit_content && <span>Explicit</span>}{" "}
                    <br />
                    <span className="bold spaced-line">More about </span>
                    <span>
                      <a href={episodeData.link} target="_blank">
                        {episodeData.podcast?.title_original}
                      </a>
                    </span>{" "}
                    <br />
                  </div>
                )}
              </div>
            </div>
            <div
              className="episode-desc col-6 mt-4"
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
