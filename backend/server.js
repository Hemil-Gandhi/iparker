// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";

// import vehicleRoutes from "./routes/vehicleRoutes.js";
// import slotRoutes from "./routes/slotRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/slots", slotRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/reports", reportRoutes);

// app.get("/", (req, res) => {
//   res.send(" Parking Management System API is running...");
// });

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// app.delete("/api/bookings/:id", async (req, res) => {
//   try {
//     const bookingId = req.params.id; // capture booking ID from URL
//     console.log("Deleting booking with ID:", bookingId);

//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
//     if (!deletedBooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

//New Code as on 28-dec

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import vehicleRoutes from "./routes/vehicleRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Models
import Booking from "./models/Booking.js"; // ✅ REQUIRED

dotenv.config();
const app = express();

/* ----------------------------------
   MIDDLEWARES
---------------------------------- */
app.use(cors());
app.use(express.json()); // replaces body-parser

/* ----------------------------------
   API ROUTES
---------------------------------- */
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);

/* ----------------------------------
   DATABASE CONNECTION
---------------------------------- */
mongoose;

/* ----------------------------------
   DELETE BOOKING (EXTRA API)
---------------------------------- */
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ----------------------------------
   SERVE ANGULAR FRONTEND
---------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ IMPORTANT: adjust folder name if different
const angularDistPath = path.join(
  __dirname,
  "../parking-frontend/dist/parking-frontend/browser"
);

app.use(express.static(angularDistPath));

app.use((req, res) => {
  res.sendFile(path.join(angularDistPath, "index.html"));
});

/* ----------------------------------
   SERVER START
---------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
