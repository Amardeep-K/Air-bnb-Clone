import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { validationListingMiddleware ,validationReviewMiddleware } from "../middlewares/validate.js";
import mongoose from "mongoose";

export const  allListings = async (req, res) => {
   req.session.name="Amar";
    const listings = await Listing.find();
   res.render("listings/index.ejs", {listings});
 }

export const createListingForm = async (req, res) => {
  
   res.render("listings/create.ejs");
 }
 export const handleCreateListing = async (req, res) => {
       const { listing } = req.body;
       
 
       // Spread the fields from the nested listing object
       const newListing = new Listing({ ...listing });
       newListing.admin = req.user._id;
        if (req.file) {
          newListing.image = {
            filename: req.file.filename,
            url: req.file.path,
          };
     
       // Await saving to DB
       await newListing.save();
         req.flash("success", "Listing created successfully!");
       
 
       // Redirect back to homepage after successful save
 
       res.redirect("/");
    }
  }

 export const showListing = async (req, res) => {
     
    const listing = await Listing.findById(req.params.id).populate({
     path: "reviews",
     populate: {
       path:"author",
     },
    })
     .populate("admin").exec();
 
    if (!listing) {
       req.flash("error", "No listings found!");
       return res.redirect("/");
     }
 
    res.render("listings/show.ejs", {listing});
 
 
  }

  export const editListingForm = async (req, res) => {
      const {id} = req.params;
      const listing = await Listing.findById(id);
     res.render("listings/edit.ejs", {listing});
  
  
   }
export const handleEditListing = async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
     req.flash("edited", "Listing edited successfully!");
   res.redirect(`/${id}`);
}
export const destroyListing = async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted", "Listing deleted successfully!");
   res.redirect("/");
}
