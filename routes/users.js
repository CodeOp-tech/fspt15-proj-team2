const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

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
module.exports = router;
