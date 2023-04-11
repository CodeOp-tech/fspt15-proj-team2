const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

// MAKE SURE USER IS LOGGED IN
function usersShouldBeLoggedIn(req, res, next) {
  // Get token from the "authorization" header with format "Bearer <token>"
  let authHeader = req.headers["authorization"];
  // Separate 'Bearer' and token to keep only the token
  let [str, token] = authHeader.split(" ");

  try {
    // Throws error on invalid/missing token
    // remember, payload includes the user_id we added to it when we created the token
    let payload = jwt.verify(token, supersecret);

    //everything is awesome!
    //get from the payload the user_id and store in the req so we can use later
    req.user_id = payload.user_id;
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

// GET ALL FROM FAVORITES FOR ONE USER
router.get("/users/favorites", usersShouldBeLoggedIn, async (req, res) => {
  try {
    // Loop through users_favorites
    // Return all favorites_id for specific user_id
    // Search API using favorites_id & return details
    const result = await db(
      `SELECT * FROM users_favorites WHERE user_id=${req.user_id}`
    );
    console.log(result);
    const items = result.data;
    console.log(items);
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL FAVORITES FROM DATABASE -- JOIN USERS & PODCAST TABLES
// WE'LL ONLY NEED THE JOIN PART IF WE INTEGRATE NOTES OR SOMETHING ELSE IN THE FAVORITES TABLE
// router.get(
//   "/users/mypodcasts",
//   usersShouldBeLoggedIn, //Use token in header in Postman

//   async function (req, res) {
//     // If we get here we know the user is logged in
//     // let podcast = res.locals.podcast; //What is this? Idk. haha
//     // let user_id = req.user_id;
//     // console.log(req);

//     try {
//       let sql = `
//             SELECT
//             users.id, favorites.id FROM users
//             JOIN users_favorites ON users.id = users_favorites.user_id
//             JOIN favorites ON favorites.id = users_favorites.favorites_id
//             WHERE users.id = ${req.user_id}
//         `;
//       let results = await db(sql);
//       console.log(results);
//       // Convert DB results into "sensible" JSON -- reformat data

//       res.send(results);
//       console.log(results);
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   }
// );
