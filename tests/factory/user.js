const mongoose = require("mongoose");
const User = mongoose.model("students");

module.exports = () => {
  return new User({
    googleId: "this1is2a3super4random5fake6google7id",
    displayName: "test user",
    role: "student",
    email: "fake@email.com",
  }).save();
};
