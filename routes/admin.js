// routes/admin.js
const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");
const carModel = require("../models/carModel");
const bookingModel = require("../models/bookingModel");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { getAdminReports } = require("../controllers/reportController");


// Admin stats route
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    const carCount = await carModel.countDocuments();
    const bookingCount = await bookingModel.countDocuments();

    res.status(200).json({ userCount, carCount, bookingCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
});



router.get("/admin/recent-bookings", verifyTokenAndAdmin, async (req, res) => {
    try {
      const recentBookings = await bookingModel.find()
        .sort({ createdAt: -1 }) // newest first
        .limit(5)
        .populate("user", "name"); // get the user's name
  
      res.status(200).json(recentBookings);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch recent bookings", error: err.message });
    }
  });


  // Get all users (Admin only)
// GET all users
router.get("/users", verifyTokenAndAdmin, async (req, res) => {
    try {
      const users = await userModel.find().select("-password"); // exclude passwords
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
  });
  
  // DELETE a user
  router.delete("/users/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
  });
  
  // TOGGLE admin role
  router.put("/users/:id/toggleAdmin", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      user.isAdmin = !user.isAdmin;
      await user.save();
      res.status(200).json({ message: "User role updated", isAdmin: user.isAdmin });
    } catch (err) {
      res.status(500).json({ message: "Failed to update user role", error: err.message });
    }
  });

  
  // GET all cars (Admin only)
router.get("/cars", verifyTokenAndAdmin, async (req, res) => {
    try {
      const cars = await carModel.find();
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch cars", error: err.message });
    }
  });


  router.get("/reports", verifyTokenAndAdmin, getAdminReports);

module.exports = router;
