import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn , isCreater} from "../middlewares/authentication.js";
import { allListings, createListingForm, destroyListing, editListingForm, handleCreateListing, handleEditListing, showListing } from "../controllers/listing.controller.js";
import { validationListingMiddleware ,validationReviewMiddleware } from "../middlewares/validate.js";

export const listingRouter = express.Router();
 listingRouter.get("/",allListings);

 // Render form to create a new listing
  listingRouter.get("/create",isLoggedIn, wrapAsync(createListingForm));

 // Show details of a specific listing
 listingRouter.get("/:id", wrapAsync(showListing));

 // Create a route to handle form submission
 listingRouter.post("/create", validationListingMiddleware, wrapAsync(handleCreateListing));

  // Render form to edit an existing listing
 listingRouter.get("/:id/edit", isLoggedIn, isCreater,  wrapAsync (editListingForm));

// Route to handle the update form submission
 listingRouter.put("/:id",isLoggedIn,isCreater, wrapAsync( handleEditListing));

  //Route to handle deletion
listingRouter.delete("/:id",isLoggedIn,isCreater, wrapAsync(destroyListing));


 