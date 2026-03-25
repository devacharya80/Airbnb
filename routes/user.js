const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const { route } = require("./listing");

// signup route
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

// signup post route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    await User.register(newUser, password);

    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

// login route
router.get("/login", (req, res) => {
  res.render("user/login");
});

// login post route
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome Back!");
    res.redirect("/listings");
  },
);

// logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "See You Again!");
    return res.redirect("/listings");
  });
});

module.exports = router;
