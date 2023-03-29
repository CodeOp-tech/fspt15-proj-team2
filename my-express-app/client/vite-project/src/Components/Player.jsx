import React from "react";
import play from "../Images/play.png";
import rewind from "../Images/rewind.png";
import fastforward from "../Images/fastforward.png";
import "./Player.css";

function Player() {
    return (
        <iframe src="https://www.listennotes.com/e/63405e9de44c49fda392918584c236c8/embed/" height="180px" width="100%"></iframe>
    )
    // return (
    //     <div className="player fixed-bottom">
    //         <button className="rewind-btn"><img src={rewind}/></button>
    //         <button className="play-btn"><img src={play}/></button>
    //         <button className="pause-btn"><img src={fastforward}/></button>
    //     </div>
        
    // )
}

export default Player;