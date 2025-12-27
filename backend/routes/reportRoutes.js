import express from "express";
import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// 📊 Get reports summary
router.get("/", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalVehicles = await Vehicle.countDocuments();

    const bookings = await Booking.find({ charges: { $exists: true } });

    let totalRevenue = 0;
    let totalDuration = 0;
    let durationCount = 0;

    bookings.forEach((b) => {
      totalRevenue += b.charges || 0;

      if (b.duration && b.duration.includes("hrs")) {
        const hours = parseFloat(b.duration.replace(" hrs", ""));
        totalDuration += hours;
        durationCount++;
      }
    });

    const avgDuration =
      durationCount > 0 ? (totalDuration / durationCount).toFixed(2) : "0";

    res.json({
      totalBookings,
      totalVehicles,
      totalRevenue,
      avgDuration,
      reportDate: new Date(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
