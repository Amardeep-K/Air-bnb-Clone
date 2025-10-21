import { Router } from "express";
import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validationReviewMiddleware } from "../middlewares/validate.js";
export const reviewRouter = Router({mergeParams: true});
reviewRouter.post("/", validationReviewMiddleware, wrapAsync(async (req, res) => {
      const { id } = req.params;
      const listing = await Listing.findById(id);
      const newReview = new Review(req.body.review);   
      await newReview.save();
      listing.reviews.push(newReview);
     await listing.save();
      console.log("added successfully");

      res.redirect(`/${id}`);
}));
// Delete review route
reviewRouter.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { listingId, reviewId } = req.params;
    console.log("Parameters:", req.params);
    
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/${listingId}`);
}));
