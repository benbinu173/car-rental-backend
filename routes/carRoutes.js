const express = require("express");
const router = express.Router();
const carModel = require("../models/carModel");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// POST: Add a new car (Admin)
router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const { name, model, pricePerDay, available, image, description } = req.body;

  if (!name || !model || !pricePerDay || !image || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCar = new carModel({
      name,
      model,
      pricePerDay,
      available,
      image,
      description,
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Failed to add car", error: error.message });
  }
});

// GET: All cars
router.get("/", async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json({ cars });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cars", error: err.message });
  }
});

// GET: Car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: "Error fetching car details", error: error.message });
  }
});

// DELETE: Car by ID (Admin)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await carModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete car", error: err.message });
  }
});

// PUT: Update a car by ID (Admin)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const { name, model, pricePerDay, available, image, description } = req.body;

    car.name = name ?? car.name;
    car.model = model ?? car.model;
    car.pricePerDay = pricePerDay ?? car.pricePerDay;
    car.available = available ?? car.available;
    car.image = image ?? car.image;
    car.description = description ?? car.description;

    const updatedCar = await car.save();
    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    res.status(500).json({ message: "Failed to update car", error: error.message });
  }
});

module.exports = router;
