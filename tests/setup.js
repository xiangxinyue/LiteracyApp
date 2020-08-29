jest.setTimeout(30000);
require("../models/student");
const keys = require("../config/keys");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/literacy", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

console.log("=-=-=-=", process.env.NODE_ENV);
