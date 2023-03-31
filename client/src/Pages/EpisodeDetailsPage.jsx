import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function EpisodeDetails() {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this podcast episode id is in the database & can be used to search API

  return (
    <div className="episode-details-container">
      <Navbar />
      <h2>Episode Summary</h2>
    </div>
  );
}

export default EpisodeDetails;
