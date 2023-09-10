const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    LoanID: {
        type: mongoose.Schema.ObjectId,
        ref: "Rental", 
    },
    AmountPaid:{
        type:Number,
        required:true,
    },
    PaymentDate:{
      type:Date,
      required:true,
    }
    
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
