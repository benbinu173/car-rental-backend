// bookingController.js

const Booking = require("../models/bookingModel");

const createBooking = async (req, res) => {
  try {
    const { car, pricePerDay, fullName, email, phone, startDate, endDate } = req.body;

    const booking = new Booking({
      user: req.user._id,
      car,
      pricePerDay,
      fullName,
      email,
      phone,
      startDate,
      endDate,
    });

    await booking.save();
    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    console.log("User ID from token:", req.user._id); // 👈
    const bookings = await Booking.find({ user: req.user._id }).populate("car", "model");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Booking Fetch Error:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};


// ✅ Export both together in one object
module.exports = {
  createBooking,
  getUserBookings,
};
