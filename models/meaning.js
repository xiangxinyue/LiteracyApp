const mongoose = require("mongoose");
const { Schema } = mongoose;

// Q123 format
const meaningQ1Schema = new Schema({
  level: Number,
  question: String,
  answer: [String],
});
mongoose.model("meaning_q1", meaningQ1Schema);

const meaningQ2Schema = new Schema({
  level: Number,
  question: String,
  answer: [String],
});
mongoose.model("meaning_q2", meaningQ2Schema);

const meaningQ3Schema = new Schema({
  level: Number,
  question: String,
  choices: [String],
  answer: String,
});
mongoose.model("meaning_q3", meaningQ3Schema);

const meaningMaterialsSchema = new Schema({
  paragraphs: [String],
  videos: [String],
});
mongoose.model("meaning_materials", meaningMaterialsSchema);

// student assignment
const meaningTestAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: String,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  newScore: Number,
});
mongoose.model("meaning_test_assigns", meaningTestAssign);

const meaningAssignAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: String,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  oldScore: Number,
  newScore: Number,
});
mongoose.model("meaning_assign_assigns", meaningAssignAssign);

const meaningProgressAssign = new Schema({
  q1Assign: [Object],
  q1Questions: [Object],
  q1Score: Number,
  q1Index: Number,
  q2Assign: [Object],
  q2Questions: [Object],
  q2Score: Number,
  q2Index: Number,
  q3Assign: [Object],
  q3Questions: [Object],
  q3Score: Number,
  q3Index: Number,
});
mongoose.model("meaning_progress_assigns", meaningProgressAssign);
