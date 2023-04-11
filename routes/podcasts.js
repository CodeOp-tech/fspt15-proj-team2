const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function usersShouldBeLoggedIn(req, res, next) {
  // Get token from the "authorization" header with format "Bearer <token>"
  let authHeader = req.headers["authorization"];
  // Separate 'Bearer' and token to keep only the token
  let [str, token] = authHeader.split(" "); //Getting error here when doing GET router function

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

// GET ALL FAVORITES FROM DATABASE -- JOIN USERS & PODCAST TABLES
router.get(
  "/users/mypodcasts",
  usersShouldBeLoggedIn, //Use token in header in Postman

  async function (req, res) {
    // If we get here we know the user is logged in
    let book = res.locals.book; //What is this? Idk. haha
    // let user_id = req.user_id;
    // console.log(req);

    try {
      let sql = `
            SELECT 
            users.id, books.bookId, books.review FROM users
            JOIN user_books ON users.id = user_books.user_id 
            JOIN books ON books.id = user_books.book_id 
            WHERE users.id = ${req.user_id}
        `;
      //Getting an error with WHERE and req.user_id, tried using variable user_id (above), but same error
      let results = await db(sql);
      console.log(results);
      // Convert DB results into "sensible" JSON
      //   user = joinToJson(results); // This function needs tweaking -- only returning one book.

      res.send(results);
      console.log(results);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);
