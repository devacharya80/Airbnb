const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControler = require("../controllers/user.js");

// signup get and post route
router
  .route("/signup")
  .get(userControler.renderSignup)
  .post(wrapAsync(userControler.createSignup));

// login get and post route
router
  .route("/login")
  .get(userControler.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControler.createLogin,
  );

// logout
router.get("/logout", userControler.logout);

module.exports = router;
