import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema({
  slotNumber: { type: String, required: true, unique: true },
  status: { type: String, default: "Available" },
  vehicleNumber: { type: String, default: "" },
});

const ParkingSlot = mongoose.model("ParkingSlot", parkingSlotSchema);
export default ParkingSlot;
