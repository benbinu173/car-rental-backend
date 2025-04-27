const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./connection");

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: "https://car-rental-frontend-woad.vercel.app", // your deployed frontend URL
  credentials: true, // if you use cookies or auth headers
}));
app.use(express.json());  // express.json() handles body parsing for JSON

// Connect to DB
connectDB();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("🚗 Car Rental Backend is Running");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes); // ✅ Correct route

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

const carRoutes = require("./routes/carRoutes");
app.use("/api/cars", carRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes); // ✅ Correct route

const adminAuthRoutes = require("./routes/adminAuthRoutes");
app.use("/api/admin/auth", adminAuthRoutes); // Admin auth route under a specific path

const adminBookingRoutes = require("./routes/adminBookingRoutes");
app.use("/api/admin/bookings", adminBookingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
