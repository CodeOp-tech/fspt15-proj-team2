const express = require("express");
const router = express.Router();
// const fetch = require("node-fetch"); // Not used.
const unirest = require("unirest");
const db = require("../model/helper");

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

const searchById = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await unirest
      .get(
        `https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`
      )
      .header("X-ListenAPI-Key", process.env.LISTEN_API_KEY);
    response.toJSON();
    console.log(response.body);
    res.send(response.body);
  } catch (error) {
    console.log(error);
  }
};

// SEARCH FOR PODCAST DETAILS BY ID
router.post("/search/:id", async (req, res) => {
  try {
    searchById(req, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
