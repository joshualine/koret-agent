const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Get All Users
router.get('/', async (req,res) => {
  const users = await User.find();
  res.send(users);
})

//Get One User

//Add user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update USer

//Delete User


module.exports = router;