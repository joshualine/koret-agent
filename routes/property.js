const router = require("express").Router();
const Property = require("../models/Property");
const User = require("../models/User");

//Add a property for rent
router.post("/property", async (req, res) => {
  const newProperty = new Property(req.body);
  try {
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
});