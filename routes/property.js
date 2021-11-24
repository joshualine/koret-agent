const router = require("express").Router();
const Property = require("../models/Property");
const User = require("../models/User");

//Add a property for rent
router.post("/", async (req, res) => {
  const newProperty = new Property(req.body);
  try {
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a property initially added
router.delete("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.userId === req.body.userId) {
      await property.deleteOne();
      res.status(200).json("the property has been removed from the database");
    } else {
      res.status(403).json("you can delete only the property you added");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;