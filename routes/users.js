const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//* CHECK IF THE USERNAME ALREADY EXISTS
async function userExists(req, res, next) {
  let { username } = req.body;
  let sql = `SELECT * FROM users WHERE username = "${username}"`;
  let userFound = await db(sql)
  if (userFound.data.length > 0) return res.status(400).send({message: "Username already exists!"});
  next();
}

// creating a new user
router.post("/register", userExists, async (req, res) => {
  const { username, password, firstName, email } = req.body;
  const hashedPW = await bcrypt.hash(password, 10);

  try {
      let sql = `INSERT INTO users (username, password, firstName, email ) VALUES ("${username}", "${hashedPW}", "${firstName}", "${email}")`
      await db(sql);
      res.status(200).send({message: "User registered!"});
  } catch(err) {
      // send the error in an object
      res.status(400).send({error: err.message})
  }
  
})

// log in for the user
router.post("/login", userExists, async (req, res) => {
  const { username, password } = req.body;

  // retrieve user from db
  try {
      let sql = `SELECT * FROM users WHERE username="${username}";`
      let result = await db(sql);
      // * understanding this syntax: everything we get back requires the .data? (no only because of the created helper file)
      let user = result.data[0];

      // if user not found, return an error
      if (!user) res.status(404).send({message: "User not found!"})

      // if found, compare the pw from the user vs what is in the database - the compare method returns a boolean
      // we need to await the bcrypt method since it does take a while
      let doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
          const token = jwt.sign({userID: user.id}, process.env.SUPER_SECRET)
          res.send({message: "Log in successful! here is your token", token, username});
      } else {
          res.send({message: "The password is incorrect!"})
      }
      
  } catch(err) {
      // send the error in an object
      res.status(400).send({message: err.message})
  }
})

module.exports = router;
