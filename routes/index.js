const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const db = require("../model/helper"); // Not used currently, but could be used if accessing the database

// FULL SEARCH FUNCTION -- used in full search POST router function -- returns all language results
const searchFullPodcast = async (req, res) => {
  try {
    const { searchTerm, offset } = req.body;
    console.log(req.body);
    const response = await unirest
      .get(
        // `https://listen-api.listennotes.com/api/v2/search?q=${searchTerm}&sort_by_date=0&offset=${offset}`
        // below is mock database api url:
        `https://listen-api-test.listennotes.com/api/v2/search?q=${searchTerm}&sort_by_date=0&language=English`
      )
      .header("X-ListenAPI-Key", process.env.LISTEN_API_KEY);
    response.toJSON();

    
    res.send(response.body.results); // Returns array of podcast episodes
  } catch (error) {
    console.log(error);
  }
};
// RETURNS OFFSET RESULTS -- SEE MORE RESULTS FUNCTION IN SEARCH COMPONENT
// const searchFullPodcastMore = async (req, res) => {
//   try {
//     const { searchTerm } = req.body;
//     const response = await unirest
//       .get(
//         `https://listen-api.listennotes.com/api/v2/search?q=${searchTerm}&sort_by_date=0&offset=11`
//         // below is mock database api url:
//         // `https://listen-api-test.listennotes.com/api/v2/search?q=${searchTerm}&sort_by_date=0&language=English`
//       )
//       .header("X-ListenAPI-Key", process.env.LISTEN_API_KEY);
//     response.toJSON();

//     console.log(response.body);
//     res.send(response.body.results); // Returns array of podcasts
//   } catch (error) {
//     console.log(error);
//   }
// };

// const searchFullPodcastEnglish = async (req, res) => {
//   try {
//     const { searchTerm } = req.body;
//     const response = await unirest
//       .get(
//         `https://listen-api.listennotes.com/api/v2/search?q=${searchTerm}&sort_by_date=0&language=English`
//       )
//       .header("X-ListenAPI-Key", process.env.LISTEN_API_KEY);
//     response.toJSON();

//     console.log(response.body.results);
//     res.send(response.body.results); // Returns array of podcasts
//   } catch (error) {
//     console.log(error);
//   }
// };

// FULL SEARCH -- RETURNS ARRAY OF EPISODE RESULTS WITH NESTED PODCAST DATA
router.post("/api/search", async (req, res) => {
  try {
    await searchFullPodcast(req, res);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/api/search/more", async (req, res) => {
//   try {
//     await searchFullPodcastMore(req, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// SEARCH BY PODCAST ID -- used in search by podcast id POST function
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

// SEARCH FOR PODCAST DETAILS BY ID -- RETURNS OBJECT WITH PODCAST DATA AND NESTED EPISODE LIST (10 EPISODES)
router.post("/api/search/:id", async (req, res) => {
  try {
    searchById(req, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
