import express from "express";
import Slot from "../models/ParkingSlot.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/available", async (req, res) => {
  try {
    const slots = await Slot.find({ status: "Available" });
    res.json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/book/:id", async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }

    if (slot.status === "Booked") {
      return res.status(400).json({ error: "Slot already booked" });
    }

    slot.status = "Booked";
    slot.vehicleNumber = vehicleNumber || "N/A";
    await slot.save();

    res.json({ message: "✅ Slot booked successfully", slot });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
