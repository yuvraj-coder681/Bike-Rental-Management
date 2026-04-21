const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware")

// ADD BIKE (Admin Only)
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { name, brand, pricePerDay } = req.body;

      const newBike = new Bike({
        name,
        brand,
        pricePerDay,
      });

      await newBike.save();

      res.status(201).json(newBike); // ✅ SUCCESS
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// DELETE BIKE (Admin Only)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await Bike.findByIdAndDelete(req.params.id);
      res.json({ message: "Bike deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// GET ALL BIKES
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;