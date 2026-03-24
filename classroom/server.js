const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser("mySecrete"));

const sessionOptions = session({
  secret: "mySecrete",
  resave: false,
  saveUninitialized: true,
});

app.use(flash());

app.use(session(sessionOptions));

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

// app.get("/testsession", (req, res) => {
//   req.session.username = "Boss";
//   res.cookie("name", "boss", { signed: true });
//   console.log(req.session.username);
//   console.log(req.signedCookies.name);
//   res.send("hello");
// });

// app.get("/dashboard", (req, res) => {
//   console.log(req.cookies.name);
//   res.send("dashboard");
// });

// app.get("/login", (req, res) => {
//   const { username, password } = req.query;

//   if (username === "dev" && password === "123") {
//     req.flash("success", "Welcome back");
//     res.redirect("/register");
//   } else {
//     req.flash("error", "invalid-credential login again");
//     res.redirect("/login");
//   }
// });

app.get("/register", (req, res) => {
  const { name = "Anonymous" } = req.query;
  req.session.name = name;

  if (name == "Anonymous") {
    req.flash("error", "user not registered");
  } else {
    req.flash("success", "user registered");
  }

  res.redirect("/hello");

  // req.session.name = name;

  // res.cookie("name", "dev");

  // let successMsg = req.flash("success");
  // let errorMsg = req.flash("error");

  // if (successMsg.length > 0) {
  //   res.send("welcome back");
  // } else {
  //   res.send("login again");
  // }
});

app.get("/hello", (req, res) => {
  // app.locals.successMsg = req.flash("success");
  // app.locals.errorMsg = req.flash("error");
  res.render("page", { name: req.session.name });
});

app.listen(3000, () => {
  console.log("listening");
});
