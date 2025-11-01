import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn , isCreater} from "../middlewares/authentication.js";
import { allListings, createListingForm, destroyListing, editListingForm, handleCreateListing, handleEditListing, showListing } from "../controllers/listing.controller.js";
import { validationListingMiddleware ,validationReviewMiddleware } from "../middlewares/validate.js";
import {upload} from "../config/cloudinary.config.js"


export const listingRouter = express.Router();
// Route to get all listings
 listingRouter.get("/",allListings);

  // Create a route to handle form submission
 listingRouter.route("/create")

            // Render form to create a new listing
            .get(isLoggedIn, wrapAsync(createListingForm))

            // Handle form submission to create a new listing
            .post( validationListingMiddleware, upload.single("listing[image]"), wrapAsync(handleCreateListing))


 // Route to show details of a specific listing
 listingRouter.route("/:id")

              // Show details of a specific listing
              .get(wrapAsync(showListing))

              // Route to handle the update form submission
              .put(isLoggedIn,isCreater, wrapAsync( handleEditListing))

                //Route to handle deletion
              .delete(isLoggedIn,isCreater, wrapAsync(destroyListing));



  // Render form to edit an existing listing
 listingRouter.get("/:id/edit", isLoggedIn, isCreater,  wrapAsync (editListingForm));




 