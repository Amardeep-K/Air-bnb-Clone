import listingValidation from "../validations/listingValidation.js";
import reviewValidation from "../validations/reviewValidation.js";
import { Listing } from "../models/listing.model.js";
import { ExpressError } from "../utils/ExpressError.js";
export const validationListingMiddleware = (req, res, next) => {
    const {error} = listingValidation.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }   
    next();
}
export const validationReviewMiddleware = (req, res, next) => {
    const {error} = reviewValidation.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }   
    next();
}