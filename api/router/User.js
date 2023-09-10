const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

//User to Register
router.post("/register", async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        const existingUserByEmail = await User.findOne({ email: req.body.email });

        if (existingUserByEmail) {
            res.status(400).json({ message: 'Email already exists' });
        }
        else {
            const result = await user.save();
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// User to login 
router.post("/login" , async(req,res)=>{
    if (req.body.email && req.body.password) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const validated = await bcrypt.compare(req.body.password, user.password);
            if (validated) {
                user.password = undefined;
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } else {
        res.status(500).json({ message: "Email and password required" });
    }
})

//Get all the Farmers Details
router.get("/allFarmers", async (req, res) => {
    try {
      const allFarmers = await User.find({});
      res.status(200).json(allFarmers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//Get Particular Farmer Detail
router.get("/farmer/:id",async(req,res)=>{
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result);
    } catch (err){
        res.status(500).json({message:err});
    }
})

//Update the Farmer Details
router.put("/updateFarmer/:id",async(req,res)=>{
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const result = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({message:err});
    }
});

module.exports = router