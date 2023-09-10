const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    Address:{
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
