const carModel = require("../models/carModel");

// @desc    Add a new car
// @route   POST /api/cars/add
// @access  Private
const addCar = async (req, res) => {
  const { name, image, price, description } = req.body;

  if (!name || !image || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCar = new carModel({ name, image, price, description });
    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Failed to add car", error: error.message });
  }
};

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getAllCars = async (req, res) => {
  try {
    const cars = await carModel.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car details" });
  }
};


// Update a car by ID
const updateCar = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ message: "Car not found" });
  
      const { name, model, pricePerDay, available } = req.body;
  
      car.name = name || car.name;
      car.model = model || car.model;
      car.pricePerDay = pricePerDay || car.pricePerDay;
      car.available = available !== undefined ? available : car.available;
  
      await car.save();
  
      res.status(200).json({ message: "Car updated successfully", car });
    } catch (error) {
      res.status(500).json({ message: "Failed to update car", error });
    }
  };


module.exports = {
  addCar,
  getAllCars,
  updateCar,
  getCarById,
};
