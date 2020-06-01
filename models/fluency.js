const mongoose = require("mongoose");
const { Schema } = mongoose;

const fluencyTestSchema = new Schema({
  paragraph: String,
  question: String,
  choices: Array,
  answer: String,
});

mongoose.model("fluency_tests", fluencyTestSchema);

const fluencyTestAssignSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: Date,
  averageSpeed: Number,
  assignment: Array,
  status: String,
});

mongoose.model("fluency_test_assigns", fluencyTestAssignSchema);

const fluencyTrainSchema = new Schema({
  paragraph: String,
  question: String,
  choices: Array,
  answer: String,
});

mongoose.model("fluency_trains", fluencyTrainSchema);

const fluencyUserSchema = new Schema({
  userId: String,
  rightId: Array,
  wrongId: Array,
});

mongoose.model("fluency_user", fluencyUserSchema);

const fluencyAssignSchema = new Schema({
  tutor: String,
  assignment: Array,
});

mongoose.model("fluency_assigns", fluencyAssignSchema);
