import Joi from "joi";
import { Listing } from "../models/listing.model.js";
const listingValidation = Joi.object({
  listing: Joi.object({
     title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  image: Joi.object({
    filename: Joi.string().allow(null, ""),
    url: Joi.string().uri().allow(null, ""),
  })

  }).required()
});
export default listingValidation;
