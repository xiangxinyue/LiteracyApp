const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const printTestAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: Date,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
});
