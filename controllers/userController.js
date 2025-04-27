const User = require("../models/userModel"); // assuming your model is named this

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    console.log(req.user);  // Already populated in verifyToken

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};



// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = req.user; // Already fetched by verifyToken

    if (user) {
      if (req.body.name) user.name = req.body.name;
      if (req.body.phone) user.phone = req.body.phone;

      if (req.file) {
        user.profileImage = req.file.filename;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.name, 
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};


module.exports = {
  getUserProfile,
  updateUserProfile,
};
