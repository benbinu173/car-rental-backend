const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true }, // ✅ Add model field
    image: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true }, // ✅ Add availability status
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
