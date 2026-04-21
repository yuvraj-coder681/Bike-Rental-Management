const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Bike = require("../models/Bike");
const authMiddleware = require("../middleware/authMiddleware");

// Create Booking
router.post("/", authMiddleware, async (req, res) => {

  try {
    const { bikeId, startDate, endDate } = req.body;

    if (!bikeId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing fields" });
    }
 
    const bike = await Bike.findById(bikeId);

    console.log("Bike status:", bike.status);

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    if (bike.status === "Booked") {
      return res.status(400).json({ message: "Bike already booked" });
    }

    const days =
      (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24) + 1;

    const totalAmount = days * bike.pricePerDay;

    const booking = new Booking({
      user: req.user.id,
      bike: bikeId,
      startDate,
      endDate,
      totalAmount,
      status: "Booked",
    });

    await booking.save();

    bike.status = "Booked";
    await bike.save();

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

// Get My Bookings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id,
      status: {$ne: "Cancelled"}
     })
      .populate("bike");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "Cancelled") {
      return res.json({ message: "Already cancelled" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Direct update without breaking schema
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "Cancelled"
    });

    await Bike.findByIdAndUpdate(booking.bike, {
      status: "Available"
    });

    res.json({ message: "Booking cancelled successfully" });

  } catch (error) {
    console.log("Cancel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;