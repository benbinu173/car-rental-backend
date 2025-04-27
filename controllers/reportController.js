const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Car = require("../models/carModel");

const getAdminReports = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name").populate("car", "name")    ;

    // Total Revenue
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);

    // Total Bookings
    const totalBookings = bookings.length;

    // Total Users
    const totalUsers = await User.countDocuments();

    // Recent Transactions (last 5)
    const recentTransactions = bookings
      .slice(-5)
      .reverse()
      .map(b => ({
        user: b.user?.name,
        amount: b.price || 0,
        car: b.carId?.name,
      }));

    // Most Booked Cars
    const carBookingCounts = {};
    bookings.forEach(b => {
      const carName = b.carId?.name;
      if (carName) {
        carBookingCounts[carName] = (carBookingCounts[carName] || 0) + 1;
      }
    });

    const mostBookedCars = Object.entries(carBookingCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([car, count]) => ({ car, count }));

    res.json({
      totalRevenue,
      totalBookings,
      totalUsers,
      recentTransactions,
      mostBookedCars,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load reports", error: err.message });
  }
};

module.exports = { getAdminReports };
