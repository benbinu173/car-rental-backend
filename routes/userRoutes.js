const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware"); // Unused middleware removed
const upload = require("../middleware/uploadMiddleware"); // Ensure this is correctly set up for file uploads
// const { verifyToken } = require("../middleware/verifyToken");

router.get("/profile", protect, getUserProfile);
router.route("/profile").put(protect, upload.single("profileImage"), updateUserProfile);

module.exports = router;
