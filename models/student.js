const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  createdAt: Date,
  role: String,
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
  fluency_assign_score: Array,
  phoneme_assign_score: Array,
  print_assign_score: Array,
  meaning_assign_score: Array,
  fluency_curr_score: Number,
  phoneme_curr_score: Number,
  print_curr_score: Number,
  meaning_curr_score: Number,
});

mongoose.model("students", studentSchema);
