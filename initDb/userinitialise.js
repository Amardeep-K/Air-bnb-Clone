import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import initialUsers from "./userData.js";
const initDb = async () => {
  try {
  
    await mongoose.connect("mongodb://localhost:27017/airbnb");
    console.log("✅ Connected to MongoDB");

    // Clear and insert fresh data
    await User.deleteMany({});
    await User.insertMany(initialUsers);

    console.log("🌱 Database initialized with sample data");
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};
initDb();