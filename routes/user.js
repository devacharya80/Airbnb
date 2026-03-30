const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControler = require("../controllers/user.js");

// signup route
router.get("/signup", userControler.renderSignup);

// signup post
router.post("/signup", wrapAsync(userControler.createSignup));

// login route
router.get("/login", userControler.renderLogin);

// login post
router.post(
  "/login",
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
