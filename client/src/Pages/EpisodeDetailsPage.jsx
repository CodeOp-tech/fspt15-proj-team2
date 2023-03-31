import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Player from "../Components/Player.jsx";

function EpisodeDetails() {
    return (
        <div className="episode-details-container">
            <Navbar/>
            <h2>Episode Summary</h2>
            <Player/>
        </div>
    )
}

export default EpisodeDetails;