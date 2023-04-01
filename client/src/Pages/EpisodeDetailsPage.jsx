import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Player from "../Components/Player.jsx";

function EpisodeDetails() {
    return (
        <div className="episode-details-container">
            <Navbar/>
            <img>Podcast image</img>
            <h2>Episode Description</h2>
            <Player/>
        </div>
    )
}

export default EpisodeDetails;