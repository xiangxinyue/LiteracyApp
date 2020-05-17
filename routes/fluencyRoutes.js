const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const FluencyTest = mongoose.model("fluency_tests");
const FluencyTrain = mongoose.model("fluency_trains");
const FluencyUser = mongoose.model("fluency_user");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/fluency/test/get", requireLogin, async (req, res) => {
    const testData = await FluencyTest.find();
    console.log(testData);
    res.send(testData[0]);
  });

  app.post("/api/fluency/score/update", async (req, res) => {
    const infor = await User.updateOne(
      { _id: req.user._id },
      { fluency_curr_score: req.body.newScore }
    ).catch((err) => console.log(err));
    res.send(infor);
  });

  app.get("/api/fluency/train/get", requireLogin, async (req, res) => {
    const trainData = await FluencyTrain.find();
    let paragraphs = [];
    let questions = [];
    let choices = [];
    let answers = [];
    await trainData.forEach((dataset) => {
      paragraphs.push(dataset.paragraph);
      questions.push(dataset.question);
      choices.push(dataset.choices);
      answers.push(dataset.answer);
    });
    console.log(trainData);
    res.send({ paragraphs, questions, choices, answers });
  });
};
