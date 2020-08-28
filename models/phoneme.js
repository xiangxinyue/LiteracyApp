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
  createAt: Date,
  status: String,
});
mongoose.model("phoneme_test_assigns", phonemeTestAssignsSchema);

const phonemeAssignAssignsSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  phonemeAssign: Array,
  audioAssign: Array,
  createAt: Date,
  oldScore: Number,
  status: String,
});
mongoose.model("phoneme_assign_assigns", phonemeAssignAssignsSchema);
