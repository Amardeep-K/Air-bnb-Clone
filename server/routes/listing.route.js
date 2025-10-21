import express from "express";
import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validationListingMiddleware ,validationReviewMiddleware } from "../middlewares/validate.js";
import { Review } from "../models/review.model.js";

export const listingRouter = express.Router();
 listingRouter.get("/", async (req, res) => {
    const listings = await Listing.find();
   res.render("listings/index.ejs", {listings});


 });
 // Render form to create a new listing
  listingRouter.get("/create", wrapAsync(async (req, res) => {
    
   res.render("listings/create.ejs");


 }));
 // Show details of a specific listing
 listingRouter.get("/:id", async (req, res) => {
    
   const listing = await Listing.findById(req.params.id).populate("reviews").exec();

  if (!listing) {
    return res.status(404).send("Listing not found");
  }

   res.render("listings/show.ejs", {listing});


 });
 // Create a route to handle form submission
   listingRouter.post("/create",validationListingMiddleware, wrapAsync(async (req, res) => {
      const { listing } = req.body;
      console.log("Received request");

      // Spread the fields from the nested listing object
      const newListing = new Listing({ ...listing });
      console.log("Received request 2");

      // Await saving to DB
      await newListing.save();
      console.log("Received request 3");

      // Redirect back to homepage after successful save

      res.redirect("/");
   })
   );

    // Render form to edit an existing listing
 listingRouter.get("/:id/edit", async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
   res.render("listings/edit.ejs", {listing});


 });

// Route to handle the update form submission
 listingRouter.put("/:id", async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
   res.redirect(`/${id}`);


 });
// Route to handle deletion
listingRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
   res.redirect("/");
});



// Reviews routes 


 