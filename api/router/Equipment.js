const express = require("express");
const router = express.Router();
const Equipment = require('../models/Equipment');
const User = require('../models/User');

//Equipment to Register
router.post("/:id", async(req,res)=>{
    const user = await User.findById(req.params.id);
    try {
      if(user){
        const equipment = new Equipment(req.body);
        const result = await equipment.save();
            res.status(200).json(result);
      }
      else{
        res.status(400).json({message:"Farmer Not Register"});
      }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//Get all the Equipments Details
router.get("/allEquipment", async (req, res) => {
    try {
      const allEquipments = await Equipment.find({}).populate("ownerID");
      res.status(200).json(allEquipments);
    } catch (err) {
      res.status(500).json({ message: err});
    }
  });

//Get Particular Equipment Detail
router.get("/:id",async(req,res)=>{
    try {
        const result = await Equipment.findById(req.params.id).populate("ownerID");
        res.status(200).json(result);
    } catch (err){
        res.status(500).json({message:err});
    }
})

//Update the Farmer Details
router.put("/updateEquipment/:id", async (req, res) => {
    const equipmentId = req.params.id;
  
    try {
      const updatedEquipment = await Equipment.findByIdAndUpdate(
        equipmentId,
        req.body,
        { new: true }
      );
  
      if (!updatedEquipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }
  
      res.status(200).json(updatedEquipment);
    } catch (err) {
      res.status(500).json({ message: err});
    }
  });

  router.delete("/deleteEquipment/:id", async (req, res) => {
    const equipmentId = req.params.id;

    try {
        const equipmentToDelete = await Equipment.findById(equipmentId);

        if (!equipmentToDelete) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);

        if (!deletedEquipment) {
            return res.status(500).json({ message: "Failed to delete equipment" });
        }

        res.status(200).json({ message: "Equipment deleted successfully", deletedEquipment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router