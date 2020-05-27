const mongoose = require("mongoose");
const { Schema } = mongoose;

const tutorSchema = new Schema({
  createdAt: Date,
  role: String,
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
});

mongoose.model("tutors", tutorSchema);
