import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
export const reviewSubmissionHandler = async (req, res) => {
      const { listingId } = req.params;
      const listing = await Listing.findById(listingId);
      const newReview = new Review(req.body.review); 
      newReview.author=req.user._id;  
      await newReview.save();      
      listing.reviews.push(newReview);
     await listing.save();
     console.log("New review added:", newReview);
      req.flash("success", "Review added successfully!");

      res.redirect(`/${listingId}`);
}

export const destroyReview =async (req, res) => {
    const { listingId, reviewId } = req.params; 
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("deleted", "Review deleted successfully!");
    res.redirect(`/${listingId}`);
}