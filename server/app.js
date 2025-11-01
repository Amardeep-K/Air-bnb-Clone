import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config.js";
import {listingRouter} from "./routes/listing.route.js";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import { ExpressError } from "./utils/ExpressError.js";
import { authenticationRouter } from "./routes/authentication.route.js";
import {User} from "./models/user.model.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oidc";

import { reviewRouter } from "./routes/reviews.route.js";


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(flash());

// Passport.js configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('success');
  res.locals.editMsg = req.flash('edited');
  res.locals.deleteMsg = req.flash('deleted');
  res.locals.errorMsg = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsmate);

app.use(methodOverride("_method"));
// Middleware to parse JSON requests
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Public
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/",listingRouter);
app.use("/:listingId/reviews", reviewRouter);
app.use("/authentication", authenticationRouter);
console.log("http://localhost:3000/");

app.all(/.*/, (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong 😬";
  res.status(statusCode).render("Errors/Error", { err });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});