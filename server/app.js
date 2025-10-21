import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config.js";
import {listingRouter} from "./routes/listing.route.js";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import { ExpressError } from "./utils/ExpressError.js";

import { reviewRouter } from "./routes/reviews.route.js";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

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