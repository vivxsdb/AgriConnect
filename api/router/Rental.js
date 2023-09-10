const express = require("express");
const router = express.Router();
const Rental = require('../models/Rental');

// Create a new Rental
router.post("/", async (req, res) => {
    try {
        const rental = new Rental(req.body);
        const result = await rental.save();
        res.status(200).json(result); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Rental By Id Detail
router.get("/rental/:id", async (req, res) => {
    try {
        const rentalId = req.params.id;
        const rental = await Rental.findById(rentalId);

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        res.status(200).json(rental);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update the Rental Details
router.put("/updateRental/:id", async (req, res) => {
    try {
        const rentalId = req.params.id;
        const updatedRental = await Rental.findByIdAndUpdate(
            rentalId,
            req.body,
            { new: true }
        );

        if (!updatedRental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        res.status(200).json(updatedRental);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
