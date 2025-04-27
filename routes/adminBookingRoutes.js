const express = require("express");
const router = express.Router();
const { getAllBookings, deleteBooking, updateBookingStatus } = require("../controllers/adminBookingController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// routes/adminBookingRoutes.js
router.get("/", verifyTokenAndAdmin, getAllBookings);
router.delete("/:id", verifyTokenAndAdmin, deleteBooking);
// ✅ Route: UPDATE booking status
router.put("/:id/status", verifyTokenAndAdmin, updateBookingStatus);


module.exports = router;
