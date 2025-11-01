import mongoose from "mongoose";
import dotenv from "dotenv";
import { Listing } from "../models/listing.model.js";
import sampleListings from "./data.js";

// Load .env file
dotenv.config();

const initDb = async () => {
  try {
  
    await mongoose.connect("mongodb://localhost:27017/airbnb");
    console.log("✅ Connected to MongoDB");

    // Clear and insert fresh data
    await Listing.deleteMany({});
    const datainit = sampleListings.map(obj => ({ ...obj, admin: "6903be025a57378def818d1d"
    }));
    await Listing.insertMany(datainit);

    console.log("🌱 Database initialized with sample data");
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Run the function
initDb();
