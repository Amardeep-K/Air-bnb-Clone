import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
 
  comment: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  listing: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  }],
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);
