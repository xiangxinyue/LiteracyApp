const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  createdAt: Date,
  role: String,
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
  fluency_eval_score: Array,
  phoneme_eval_score: Array,
  print_eval_score: Array,
  meaning_eval_score: Array,
  fluency_train_score: Array,
  phoneme_train_score: Array,
  print_train_score: Array,
  meaning_train_score: Array,
  fluency_curr_score: Number,
  phoneme_curr_score: Number,
  print_curr_score: Number,
  meaning_curr_score: Number,
});

mongoose.model("students", studentSchema);
