const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const mongoose = require("mongoose");
const FluencyTest = mongoose.model("fluency_tests");
const FluencyTrain = mongoose.model("fluency_trains");
const FluencyUser = mongoose.model("fluency_user");
const FluencyAssign = mongoose.model("fluency_assigns");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/api/fluency/test/get", requireLogin, async (req, res) => {
    const testData = await FluencyTest.find();
    console.log(testData);
    res.send(testData[0]);
  });

  app.post("/api/fluency/score/update", async (req, res) => {
    const infor = await User.findByIdAndUpdate(req.user._id, {
      fluency_curr_score: req.body.newSpeed,
    }).catch((err) => console.log(err));
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

  app.get("/api/fluency/train/gettable", requireTutor, async (req, res) => {
    let data = [];
    const traindata = await FluencyTrain.find();
    traindata.forEach((train) => {
      const dict = {
        paragraph: train.paragraph,
        question: train.question,
        choices: train.choices,
        answer: train.answer,
        id: train._id,
      };
      data.push(dict);
    });
    res.send(data);
  });

  app.get("/api/fluency/test/gettable", requireTutor, async (req, res) => {
    const testdata = await FluencyTest.find();
    res.send(testdata[0]);
  });

  app.post("/api/fluency/test/update", requireTutor, async (req, res) => {
    const testdata = await FluencyTest.find();
    const id = testdata[0]._id;
    const data = await FluencyTest.findByIdAndUpdate(id, {
      paragraph: req.body.data,
    });
    res.send(data);
  });

  app.post("/api/fluency/train/add", requireTutor, async (req, res) => {
    const data = await new FluencyTrain(req.body.data).save();
    res.send(data);
  });

  app.post("/api/fluency/train/delete", requireTutor, async (req, res) => {
    const data = await FluencyTrain.findByIdAndDelete(req.body.id);
    res.send(data);
  });

  app.post("/api/fluency/assign/add", requireTutor, async (req, res) => {
    const data = await new FluencyAssign({
      tutor: req.user.displayName,
      assignment: req.body.data,
    }).save();
    res.send(data);
  });
};
