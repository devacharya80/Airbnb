const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const plm = passportLocalMongoose.default || passportLocalMongoose; // ← add this

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm); // ← use plm instead of passportLocalMongoose

module.exports = mongoose.model("User", userSchema);
