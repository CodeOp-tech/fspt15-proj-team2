const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

//* CHECK IF THE USERNAME ALREADY EXISTS
async function userExists(req, res, next) {
  let { username } = req.body;
  let sql = `SELECT * FROM users WHERE username = "${username}"`;
  let userFound = await db(sql);
  if (userFound.data.length > 0)
    return res.status(400).send({ message: "Username already exists!" });
  next();
}

// TO CHECK IF USER IS LOGGED IN
async function isLoggedIn(req, res, next) {
  // get the token from the "authorization" header in our frontend (the options)
  let authHeader = req.headers["authorization"];
  try {
    // we only want our token so we have to split our authHeader into the following
    let [str, token] = authHeader.split(" ");
    console.log(token);
    console.log(str);
    // jwt will check the payload and if a token doesn't exist then it will throw an error
    let payload = jwt.verify(token, process.env.SUPER_SECRET);
    console.log(payload);
    // store the payload in the req to be used later
    req.userID = payload.userID;
    console.log(userID);
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

// creating a new user
router.post("/signup", userExists, async (req, res) => {
  const { firstName, email, username, password } = req.body;

  try {
    const hashedPW = await bcrypt.hash(password, 10);
    let sql = `INSERT INTO users (firstName, email, username, password) VALUES ("${firstName}", "${email}", "${username}", "${hashedPW}");`;
    await db(sql);
    res.status(200).send({ message: "User registered!" });
  } catch (err) {
    // send the error in an object
    res.status(400).send({ error: err.message });
  }
});

// log in for the user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // retrieve user from db
  try {
    let sql = `SELECT * FROM users WHERE username="${username}";`;
    let result = await db(sql);
    let user = result.data[0];
    // if user not found, return an error
    if (!user) res.status(404).send({ message: "User not found!" });
    let doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userID: user.id }, process.env.SUPER_SECRET);

      // we do not want the user's password in the object we are sending for security reasons
      delete user.password;

      // this information is sent to our console
      res.send({
        message: "Log in successful! Here is your token",
        token,
        user,
      });
    } else {
      res.send({ message: "The password is incorrect!" });
    }
  } catch (err) {
    // send the error in an object
    res.status(400).send({ message: err.message });
  }
});

// THIS FUNCTION NEEDS MORE WORK
// INSERT a new podcast episode into favorites/junction table
// I only tested it with the first sql segment and the favorites table so may need tweaking
router.post("/favorites", isLoggedIn, async function (req, res) {
  const { id } = req.body; // id from episode
  // const user_id = userID; // NOT SURE WHERE TO GET THIS FROM...CAN WE GET IT FROM THE ISLOGGEDIN FUNCTION?
  const sql = `INSERT INTO favorites (id) VALUES ('${id}') INTO users_favorites (user_id, favorites_id) VALUES ('${req.userID}',  '${id}')`;
  try {
    await db(sql);
    const results = await db("SELECT * FROM favorites");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE a podcast episode from favorites/junction table
// I only tested it with the first sql segment and the favorites table so may need tweaking
router.delete("/favorites/:id", isLoggedIn, async function (req, res) {
  const id = req.params.id;
  const user_id = user_id; // from the isLoggedIn function?
  const sql = `DELETE FROM favorites WHERE id="${id}" FROM users_favorites WHERE (user_id, favorites_id) VALUES ('${user_id}',  '${id}')";`;
  try {
    await db(sql);
    const results = await db("SELECT * FROM favorites");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET ALL FROM FAVORITES FOR ONE USER -- running when account page loads
router.get("/account", isLoggedIn, async (req, res) => {
  try {
    // Return all favorites_id for specific user_id
    // Search API using favorites_id & return details
    const result = await db(
      `SELECT favorites_id FROM users_favorites WHERE users_favorites.user_id = ${req.userID}`
    );
    // console.log(result);
    const items = result.data;
    console.log(items);

    //Could include function to just return the episode IDs here
    //Could also include function to search API to return episode details instead of IDs here?
    res.send(items);
    return;
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.get("/account", isLoggedIn, async function (req, res) {
//   res.status(200).send({
//     message: req.user_id,
//   });
// });

module.exports = router;
