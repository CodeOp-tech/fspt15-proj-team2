import React from "react";
import play from "../Images/play.png";
import rewind from "../Images/rewind.png";
import fastforward from "../Images/fastforward.png";
import "./Player.css";

function Player() {
    return (
        <div className="player fixed-bottom">
            <button className="rewind-btn"><img src={rewind}/></button>
            <button className="play-btn"><img src={play}/></button>
            <button className="pause-btn"><img src={fastforward}/></button>
        </div>
        
    )
}

export default Player;