import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  ownerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  entryTime: { type: Date, default: Date.now },
  exitTime: { type: Date },
  slotNumber: { type: String },
  status: { type: String, enum: ["Parked", "Exited"], default: "Parked" },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
