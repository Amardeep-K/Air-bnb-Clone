import express from "express";
import { Listing } from "../models/listing.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validationMiddleware } from "../middlewares/validate.js";

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
    const {id} = req.params;
    const listing = await Listing.findById(id);
   res.render("listings/show.ejs", {listing});


 });
 // Create a route to handle form submission
  listingRouter.post("/", validationMiddleware, wrapAsync(async (req, res) => {
   
   const { title, description, price, location, imageUrl, country } = req.body;
    const newlisting = new Listing({
        title,
        description,
        price,
        location
        ,imageUrl,
        country
      }); 
       newlisting.save();
    res.redirect("/");


 }));

    // Render form to edit an existing listing
 listingRouter.get("/:id/edit", async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
   res.render("listings/edit.ejs", {listing});


 });

// Route to handle the update form submission
 listingRouter.get("/:id", async (req, res) => {
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


 