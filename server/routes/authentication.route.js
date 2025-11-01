import express from 'express';
import { wrapAsync } from '../utils/wrapAsync.js';
import passport from 'passport';
import { storeReturnTo } from '../middlewares/authentication.js';
import { renderloginForm, renderRegisterForm, handleRegisterForm, handleLoginForm ,handleLogout } from '../controllers/authentication.controller.js';


export const authenticationRouter = express.Router({mergeParams: true});

// Login routes
authenticationRouter.route('/login')
                     // Render  forms
                    .get(renderloginForm )
                    // Handle login form submission
                    .post(storeReturnTo, passport.authenticate('local',{failureRedirect:'/authentication/login', failureFlash:true }), handleLoginForm ); 

// Registration routes
authenticationRouter.route('/register')
                    // Render registration form
                    .get(renderRegisterForm )
                    // Handle registration form submission
                    .post( storeReturnTo, wrapAsync(handleRegisterForm)); 

// Handle logout
authenticationRouter.get('/logout', storeReturnTo, handleLogout );


