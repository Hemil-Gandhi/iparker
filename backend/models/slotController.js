import Slot from "../models/ParkingSlot.js";

export const initializeSlots = async (req, res) => {
  try {
    const existing = await Slot.countDocuments();
    if (existing === 0) {
      const slots = [];
      for (let i = 1; i <= 50; i++) {
        slots.push({ slotNumber: `S${i}`, status: "Available" });
      }
      await Slot.insertMany(slots);
      res.status(200).json({ message: "Slots initialized successfully" });
    } else {
      res.status(200).json({ message: "Slots already initialized" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSlotStatus = async (req, res) => {
  try {
    const { slotNumber, status } = req.body;
    await Slot.findOneAndUpdate({ slotNumber }, { status });
    res.status(200).json({ message: "Slot updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
