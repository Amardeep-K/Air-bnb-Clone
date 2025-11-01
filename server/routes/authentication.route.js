import express from 'express';
import { wrapAsync } from '../utils/wrapAsync.js';
import passport from 'passport';
import { storeReturnTo } from '../middlewares/authentication.js';
import { renderloginForm, renderRegisterForm, handleRegisterForm, handleLoginForm ,handleLogout } from '../controllers/authentication.controller.js';


export const authenticationRouter = express.Router({mergeParams: true});

// Render  forms
authenticationRouter.get('/login',renderloginForm ); 
authenticationRouter.get('/register',renderRegisterForm ); 


// Handle registration form submission
authenticationRouter.post('/register', storeReturnTo, wrapAsync(handleRegisterForm));
 

// Handle login form submission
authenticationRouter.post('/login', storeReturnTo, passport.authenticate('local',{failureRedirect:'/authentication/login', failureFlash:true }), handleLoginForm );

// Handle logout
authenticationRouter.get('/logout', storeReturnTo, handleLogout );


