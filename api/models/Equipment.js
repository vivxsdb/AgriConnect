const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
    ownerID:{
     type:mongoose.Schema.ObjectId,
     ref: "User", 
     required:true
    },
    equipmentName:{
         type:String,
         required:true,
    },
    equipmentImg:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
   },
   RentalRatePerDay:{
     type:Number,
     required:true,
   },
    AvailabilityStatus: {
        type: String,
        enum: ["Available", "Rented"],
        required: true,
    },
    PurchaseDate: {
        type: Date,
    },
    PurchasePrice: {
        type: Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model("Equipment", EquipmentSchema);
