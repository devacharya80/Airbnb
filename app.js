const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then(() => {
    console.log("connected to DB");
    app.listen(8080, () => {
      console.log("listening to 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// session options
const sessionOptions = {
  secret: "mysupersecretecode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Root Route
app.get("/", (req, res) => {
  res.send("i am root");
});

// session middlewares and connect-flash middleware
app.use(session(sessionOptions));
app.use(flash());

// activates the passport
app.use(passport.initialize());
// adds session for passport
app.use(passport.session());

// Use passport local login strategy and use User model to authenticate username and password.
passport.use(new LocalStrategy(User.authenticate()));
// stores user id in session
passport.serializeUser(User.serializeUser());
// retrieves user from session id and attaches to request object
passport.deserializeUser(User.deserializeUser());

// local Variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/register", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "Devacharya",
//   });
//   const newUser = await User.register(fakeUser, "hello world");
//   res.send(newUser);
// });

// listing route
app.use("/listings", listingRouter);

// Reviews route
app.use("/listings/:id/reviews", reviewRouter);

// User route
app.use("/", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "message not found" } = err;
  res.status(statusCode).render("error", { message });
});
