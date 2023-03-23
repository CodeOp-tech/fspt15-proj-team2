const express = require("express");
const router = express.Router();
const podcastApi = require("podcast-api");

// Set up authentication
podcastApi.setAuth({ token: process.env.LISTEN_API_KEY || null });

// Define a route for searching podcasts
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const limit = req.query.limit || 10;
    const results = await fetch(podcastApi.search({ term: searchTerm, limit }));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Define a route for getting podcast metadata
router.get("/podcasts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const podcast = await podcastApi.lookup({ id });
    res.json(podcast);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Define a route for getting recent podcast episodes
router.get("/podcasts/:id/episodes", async (req, res) => {
  try {
    const id = req.params.id;
    const limit = req.query.limit || 10;
    const episodes = await podcastApi.episodes({ id, limit });
    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
