import React from "react";
import play from "../Images/play.png";
import rewind from "../Images/rewind.png";
import fastforward from "../Images/fastforward.png";
import "./Player.css";

function Player() {
    return (
        <div className="player fixed-bottom">
            <img src={rewind}/>
            <img src={play}/>
            <img src={fastforward}/>
        </div>
    )
}

export default Player;