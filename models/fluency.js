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
  createAt: Date,
  averageSpeed: Number,
  assignment: Array,
});

mongoose.model("fluency_test_assigns", fluencyTestAssignSchema);

const fluencyAssignAssignsSchema = new Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  createAt: Date,
  assignment: Array,
  oldSpeed: Number,
  newSpeed: Number,
});
mongoose.model("fluency_assign_assigns", fluencyAssignAssignsSchema);
