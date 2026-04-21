const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bikeRoutes = require("./routes/bikeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes)
app.use("/api/bikes", bikeRoutes);
app.use("/api/bookings", bookingRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bikeRental")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
    res.send("Bike Rental API Running");
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    app.use("/api/bookings", require("./routes/bookingRoutes"));
});