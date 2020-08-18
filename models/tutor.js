const mongoose = require("mongoose");
const { Schema } = mongoose;

const tutorSchema = new Schema({
  role: String,
  email: String,
  password: String,
});

mongoose.model("tutors", tutorSchema);
