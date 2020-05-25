const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  createdAt: Date,
  role: String,
  googleId: String,
  displayName: String,
  email: String,
  photo: String,
  fluency_score: Object,
  phoneme_score: Object,
  morp_awar_score: Object,
  orth_awar_score: Object,
  numeracy_score: Object,
  fluency_curr_score: Number,
  phoneme_curr_score: Number,
  phoneme_audio: Array,
  morp_awar_curr_score: Number,
  orth_awar_curr_score: Number,
  numeracy_curr_score: Number,
});

mongoose.model("users", userSchema);
