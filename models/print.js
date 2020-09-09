const mongoose = require("mongoose");
const { Schema } = mongoose;

// Q123 format
const printQ1Schema = new Schema({
  level: Number,
  question: String,
  answer: [String],
});
mongoose.model("print_q1", printQ1Schema);

const printQ2Schema = new Schema({
  level: Number,
  question: String,
  choices: [String],
  answer: String,
});
mongoose.model("print_q2", printQ2Schema);

const printQ3Schema = new Schema({
  level: Number,
  question: String,
  choices: [{ choice1: String, choice2: String, answer: String }],
});
mongoose.model("print_q3", printQ3Schema);

const printMaterialsSchema = new Schema({
  paragraphs: [String],
  videos: [String],
});
mongoose.model("print_materials", printMaterialsSchema);

// student assignment
const printTestAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: String,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  newScore: Number,
});
mongoose.model("print_test_assigns", printTestAssign);

const printAssignAssign = new Schema({
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
mongoose.model("print_assign_assigns", printAssignAssign);

const printProgressAssign = new Schema({
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
mongoose.model("print_progress_assigns", printProgressAssign);
