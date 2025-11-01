import { Router } from "express";
import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validationReviewMiddleware } from "../middlewares/validate.js";
import { destroyReview, reviewSubmissionHandler } from "../controllers/review.controller.js";

import { isLoggedIn } from "../middlewares/authentication.js";
export const reviewRouter = Router({mergeParams: true});
reviewRouter.post("/", isLoggedIn, validationReviewMiddleware, wrapAsync(reviewSubmissionHandler));
// Delete review route
reviewRouter.delete("/:reviewId",  isLoggedIn, wrapAsync(destroyReview));
