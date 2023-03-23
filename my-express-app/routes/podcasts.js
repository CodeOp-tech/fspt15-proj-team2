const express = require("express");
const router = express.Router();
const { Client } = require("podcast-api");

const client = Client({
  apiKey: process.env.LISTEN_API_KEY || null,
});

// FULL SEARCH -- RETURNING SAMPLE DATA -- NOT USING API KEY
router.get("/search", async (req, res) => {
  const searchTerm = req.params;
  try {
    const results = await client.search({
      q: { searchTerm },
    });
    // console.log(results);
    res.status(200).send(results.data.results); // Returns an array of podcasts
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
