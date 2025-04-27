const Booking = require("../models/bookingModel");

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.remove();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};

// ✅ Update booking status
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  // Valid status options
  const allowedStatuses = ["Pending", "Approved", "Cancelled", "Completed"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking status updated to ${status}`, booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

module.exports = {
  getAllBookings,
  deleteBooking,
  updateBookingStatus,
};
