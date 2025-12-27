import mongoose from "mongoose";
import dotenv from "dotenv";
import ParkingSlot from "./models/ParkingSlot.js";

dotenv.config();

const seedSlots = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

    await ParkingSlot.deleteMany();

    const slots = [];
    const sections = ["A", "B", "C", "D", "E"];

    for (const section of sections) {
      for (let num = 1; num <= 10; num++) {
        slots.push({
          slotNumber: `${section}${num}`,
          section: section,
          number: num,
          status: "Available",
          vehicleNumber: "",
        });
      }
    }

    await ParkingSlot.insertMany(slots);
    console.log("✅ 50 Parking Slots (A1–E10) seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding slots:", err);
    process.exit(1);
  }
};

seedSlots();
