const mongoose = require("mongoose");
const { Schema } = mongoose;

const phonemeTestSchema = new Schema({
  word: String,
  phoneme: String,
  level: Number,
});
mongoose.model("phoneme_tests", phonemeTestSchema);
const phonemeTrainSchema = new Schema({
  word: String,
  phoneme: String,
  level: Number,
});
mongoose.model("phoneme_trains", phonemeTrainSchema);
const phonemeUserSchema = new Schema({
  userId: String,
  rightId: Array,
  wrongId: Array,
});
mongoose.model("phoneme_user", phonemeUserSchema);
// fluencyAssignSchema
