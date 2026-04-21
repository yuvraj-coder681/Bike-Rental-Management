const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

module.exports = mongoose.model("Bike", bikeSchema);