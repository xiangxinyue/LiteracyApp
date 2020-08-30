const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  createdAt: Date,
  role: String,
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
  fluency_score: Array,
  phoneme_score: Array,
  print_score: Array,
  meaning_score: Array,
});

mongoose.model("students", studentSchema);
