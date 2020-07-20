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
    answer: [String],
  });
  mongoose.model("meaning_q3", meaningQ3Schema);
  

// evaluation creation
const meaningEvalSchema = new Schema({
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  createAt: Date,
  status: String,
  tutor: String,
});
mongoose.model("meaning_evals", meaningEvalSchema);

// student assignment
const meaningTestAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: Date,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  newScore: Number,
});
mongoose.model("meaning_test_assigns", meaningTestAssign);

const meaningTrainAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: Date,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  oldScore: Number,
  newScore: Number,
});
mongoose.model("meaning_train_assigns", meaningTrainAssign);

const meaningEvalAssign = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: Date,
  q1Assign: Array,
  q2Assign: Array,
  q3Assign: Array,
  oldScore: Number,
  newScore: Number,
});
mongoose.model("meaning_eval_assigns", meaningEvalAssign);
