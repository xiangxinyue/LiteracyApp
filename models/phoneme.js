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

const phonemeAssignSchema = new Schema({
  tutor: String,
  createAt: Date,
  assignment: Array,
});
mongoose.model("phoneme_assigns", phonemeAssignSchema);

const phonemeAudioAssignSchema = new Schema({
  tutor: String,
  createAt: Date,
  assignment: Array,
});
mongoose.model("phoneme_audio_assigns", phonemeAudioAssignSchema);

const phonemeAudioAssignStudentSchema = new Schema({
  studentId: String,
  audioAssignId: String,
  studentName: String,
  assignment: Array,
});
mongoose.model(
  "phoneme_audio_student_assigns",
  phonemeAudioAssignStudentSchema
);
