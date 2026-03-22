const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      filename: String,
      default:
        "https://images.unsplash.com/photo-1605559911160-a3d95d213904?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1605559911160-a3d95d213904?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww"
          : v,
    },
    price: {
      type: Number,
      min: 0,
    },
    location: {
      type: String,
    },
    country: {
      type: String,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
