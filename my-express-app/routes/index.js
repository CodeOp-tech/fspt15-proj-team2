const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const unirest = require("unirest");
const db = require("../model/helper");

// const client = Client({
//   apiKey: process.env.LISTEN_API_KEY || null,
// });

const searchFullPodcast = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const response = await unirest
      .get(
        `https://listen-api.listennotes.com/api/v2/search?q=${searchTerm}&sort_by_date=0`
      )
      .header("X-ListenAPI-Key", process.env.LISTEN_API_KEY);
    response.toJSON();

    console.log(response.body.results);
    res.send(response.body.results); // Returns array of podcasts
  } catch (error) {
    console.log(error);
  }
};

// FULL SEARCH -- RETURNS ARRAY OF EPISODE RESULTS
router.post("/search", async (req, res) => {
  try {
    searchFullPodcast(req, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
