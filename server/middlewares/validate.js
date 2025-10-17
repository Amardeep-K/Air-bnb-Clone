import listingValidation from "../validations/listingValidation.js";
import { Listing } from "../models/listing.model.js";
import { ExpressError } from "../utils/ExpressError.js";
export const validationMiddleware = (req, res, next) => {
    const {error} = Listing.schema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }   
}