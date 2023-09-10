const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
    farmerID: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
    },
    equipmentID: {
        type: mongoose.Schema.ObjectId,
        ref: "Equipment", 
    },
    totalCost: {
        type: Number, 
        default: 0,
    },
    status: {
        type: String,
        enum: ["Active", "Cancelled", "Completed"],
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Rental", RentalSchema);
