import mongoose from "mongoose";
import dotenv from "dotenv";
import { Review } from "../models/review.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
    const reviewDb = wrapAsync(async () => {
  await mongoose.connect("mongodb://localhost:27017/airbnb");
  console.log("✅ Connected to MongoDB");

  // Clear and insert sample reviews
  await Review.deleteMany({});
  await Review.insertMany([
    { name: "Alice", comment: "Great place to stay!", rating: 5 },
    { name: "Bob", comment: "Very comfortable and well-located.", rating: 4 }
  ]);
  console.log("🌱 Reviews collection initialized with sample data");

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
});

// Run the function
reviewDb();