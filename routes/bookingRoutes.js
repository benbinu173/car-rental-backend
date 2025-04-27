const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createBooking, getUserBookings } = require("../controllers/bookingController");

// Import Booking model (since we're using it directly in /my-bookings)
const Booking = require("../models/bookingModel");
// const { verifyToken } = require("../middleware/verifyToken");

// Create a booking (already set up)
router.post("/book", protect, createBooking);

// Get all bookings for the logged-in user
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('car', 'name')  // Populate the carId field with car details (specifically the 'name' field)
      // .exec();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


router.get("/user/bookings",protect , getUserBookings);

module.exports = router;
