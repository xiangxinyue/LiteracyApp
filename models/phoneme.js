const mongoose = require("mongoose");
const { Schema } = mongoose;

const phonemePhonemesSchema = new Schema({
  word: String,
  phoneme: String,
  level: Number,
});
mongoose.model("phoneme_phonemes", phonemePhonemesSchema);

const phonemeMaterialsSchema = new Schema({
  paragraphs: [String],
  videos: [String],
});
mongoose.model("phoneme_materials", phonemeMaterialsSchema);

const phonemeAudiosSchema = new Schema({
  question: String,
  audios: [String],
  level: Number,
});
mongoose.model("phoneme_audios", phonemeAudiosSchema);

const phonemeTestAssignsSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  phonemeAssign: Array,
  newScore: Number,
  createAt: String,
  status: String,
});
mongoose.model("phoneme_test_assigns", phonemeTestAssignsSchema);

const phonemeAssignAssignsSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  phonemeAssign: Array,
  audioAssign: Array,
  createAt: String,
  oldScore: Number,
  status: String,
});
mongoose.model("phoneme_assign_assigns", phonemeAssignAssignsSchema);

const phonemeProgressAssignSchema = new Schema({
  phonemeAssign: [Object],
  phonemeIndex: Number,
  ids: [String],
  wrongIds: [String],
  words: [String],
  phonemes: [String],
  phonemeLevels: [Number],
  answers: [String],
  audioIndex: Number,
  audioLevels: [Number],
  originalAudios: [[String]],
  questions: [String],
  answerAudios: [String],
});
mongoose.model("phoneme_progress_assigns", phonemeProgressAssignSchema);
