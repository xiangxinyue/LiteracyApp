const mongoose = require("mongoose");
const { Schema } = mongoose;

const fluencyDataSchema = new Schema({
  paragraph: String,
  question: String,
  choices: Array,
  answer: String,
});
mongoose.model("fluency_datas", fluencyDataSchema);

const fluencyMaterialsSchema = new Schema({
  paragraphs: [String],
  videos: [String],
});
mongoose.model("fluency_materials", fluencyMaterialsSchema);

const fluencyTestAssignSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: String,
  averageSpeed: Number,
  assignment: Array,
});

mongoose.model("fluency_test_assigns", fluencyTestAssignSchema);

const fluencyAssignAssignSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: String,
  assignment: Array,
  oldSpeed: Number,
  newSpeed: Number,
});
mongoose.model("fluency_assign_assigns", fluencyAssignAssignSchema);

const fluencyProgressAssignSchema = new Schema({
  speed: [Number],
  score: Number,
  index: Number,
  length: Number,
  currPara: String,
  currParaArray: [String],
  paragraphs: [String],
  questions: [String],
  choices: [[String]],
  answers: [String],
  studentAnswers: [String],
});
mongoose.model("fluency_progress_assigns", fluencyProgressAssignSchema);
