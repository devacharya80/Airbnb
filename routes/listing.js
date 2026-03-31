const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const Listing = require("../models/listing.js");

const listingController = require("../controllers/listing.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Index and Create routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createListing),
  // );
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show,Update and Delete Routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

module.exports = router;
