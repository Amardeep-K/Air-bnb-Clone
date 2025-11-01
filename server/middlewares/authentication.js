
import { Listing } from "../models/listing.model.js";
import {Review} from "../models/review.model.js";
export const isLoggedIn = (req, res, next) => {
    
    if(!req.isAuthenticated()){
       
        req.session.redirectUrl = req.originalUrl;
        
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/authentication/login');
    }  
    next();
}

export const storeReturnTo = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();}
export const isCreater = async  (req, res, next) => {
    const {id} = req.params;
    const listing =   await Listing.findById(id);

    if(!listing.admin.equals(res.locals.currentUser._id)){
       req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/${id}`);
    }
    next();
}
export const isAuthor = async  (req, res, next) => {
    const {id , reviewId} = req.params;
    const review =   await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currentUser._id)){
       req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/${id}`);
    }
    next();
}