import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  ownerName: { type: String, required: true },
  slotNumber: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  duration: { type: String },
  charges: { type: Number, default: 0 },
});

bookingSchema.pre("save", function (next) {
  if (this.entryTime && this.exitTime) {
    const entry = new Date(this.entryTime);
    const exit = new Date(this.exitTime);
    const diffMs = exit - entry;

    if (diffMs > 0) {
      const diffHrs = diffMs / (1000 * 60 * 60);
      this.duration = diffHrs.toFixed(2) + " hrs";

      const ratePerHour = 30; 
      this.charges = Math.ceil(diffHrs * ratePerHour);
    } else {
      this.duration = "Invalid";
      this.charges = 0;
    }
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
