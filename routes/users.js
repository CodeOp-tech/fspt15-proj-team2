const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//* CHECK IF THE USERNAME ALREADY EXISTS
async function userExists(req, res, next) {
  let { username } = req.body;
  let sql = `SELECT * FROM users WHERE username = "${username}"`;
  let userFound = await db(sql);
  if (userFound.data.length > 0)
    return res.status(400).send({ message: "Username already exists!" });
  next();
}

// creating a new user
router.post("/signup", userExists, async (req, res) => {
  const { firstName, email, username, password } = req.body;
  const stringPass = password.toString();
  try {
    const hashedPW = await bcrypt.hash(stringPass, 10);
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
      res.send({
        message: "Log in successful! here is your token",
        token,
        username,
      });
    } else {
      res.send({ message: "The password is incorrect!" });
    }
  } catch (err) {
    // send the error in an object
    res.status(400).send({ message: err.message });
  }
});

// INSERT a new podcast episode into favorites table 
router.post("/favorites", isLoggedIn, async function (req, res) {
  const {id}  = req.body;
  const sql = `INSERT INTO favorites (id) VALUES ('${id}')`;
  try {
    const results = await db(sql);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
});

// DELETE a podcast episode favorites table 
router.delete("/favorites/:id", isLoggedIn, async function (req, res) {
  const {id}  = req.body;
  const sql = `DELETE FROM favorites (id) VALUES ('${id}')`;
  try {
    const results = await db(sql);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({message: err.message});
  }
});




module.exports = router;
