import Joi from "joi";
const reviewValidation = Joi.object({
    review: Joi.object({
        rating: Joi.string().min(1).max(5).required(),
        
        comment: Joi.string().min(10).required()
    }).required()
});
export default reviewValidation;