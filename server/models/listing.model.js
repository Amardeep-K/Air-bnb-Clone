import mongoose, { set } from "mongoose";
 const listingSchema = new mongoose.Schema({
title:{
    type: String,
    required: true
},
description:{   
    type: String,
    required: true
},
price:{
    type: Number,
    required: true  
},
location:{
    type: String,
    required: true
},
image:
{
     filename: { type: String, default: "listingimage" },
  url: {
    type: String,
    default: "https://via.placeholder.com/150",
    set: (v) => v === "" ? "https://via.placeholder.com/150" : v
  }
},
country:{
    type: String,
    required: true
},
reviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
    
}],
 });
    export const Listing = mongoose.model("Listing", listingSchema);
