import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SearchContext } from "../SearchContext";

function EpisodeDetails() {
  const params = useParams(); //A part of react-router
  const ID = params.id; //Pulls the id from the react-router data to be used in the functions below --
  // this podcast episode id is in the database & can be used to search API
  let { results, setResults } = useContext(SearchContext);

  return (
    <div className="episode-details-container">
      <Navbar />
      {/* This link should keep the results from the previous search -- maybe refetch the data? 
      Or store it locally? Or use onClick with this button to render it in the search results somehow...
      not sure yet.*/}
      <Link to="/results">
        <button className="btn btn-primary mt-2">Back to search results</button>
      </Link>
      <h2>Episode Summary</h2>
    </div>
  );
}

export default EpisodeDetails;
