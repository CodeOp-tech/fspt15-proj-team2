import React from "react";
import "./Player.css";

function Player({url}) {

    return (
        <div className="player">
            <iframe src={url} height="180px" width="100%" scrolling="no" loading="lazy"></iframe>
        </div>
    )
}

export default Player;