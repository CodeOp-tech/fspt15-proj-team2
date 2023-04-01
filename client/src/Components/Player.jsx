import React from "react";
import "./Player.css";

function Player({url}) {
    return (
        <div className="fixed-bottom">
            <iframe  src={url} height="180px" width="100%"></iframe>
        </div>
    )
}

export default Player;