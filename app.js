const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

app.get("/", (req, res) => {
  res.send("i am root");
});

app.get("/testListing", async (req, res) => {
  try {
    await Listing.create({
      title: "My New Villa",
      description: "New the Beach",
      price: 1200,
      location: "Magadi, Banglore",
      country: "India",
    });
    console.log("saved to db");
    res.send("saved to db");
  } catch (err) {
    console.log(err);
  }
});

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
