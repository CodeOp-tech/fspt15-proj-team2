import React from "react";
import { useState } from "react";

function SearchResults({ term }) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //Function for full search with API -- not working yet. getting 404 error
  const searchPodcast = async (searchTerm) => {
    setLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    };
    try {
      let results = await fetch(`/api/search`, options);
      let data = await results.json();
      console.log(data);
      return data; // Returns array of 10 podcast episodes that meet search criteria
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
}

export default SearchResults;
