const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const mongoose = require("mongoose");
const FluencyTest = mongoose.model("fluency_tests");
const FluencyTrain = mongoose.model("fluency_trains");
const FluencyUser = mongoose.model("fluency_user");
const FluencyAssign = mongoose.model("fluency_assigns");
const Student = mongoose.model("students");
const Tutor = mongoose.model("tutors");
const FluencyTestAssign = mongoose.model("fluency_test_assigns");

module.exports = (app) => {
  // student
  // testing
  app.post("/api/fluency/test/assign/create", async (req, res) => {
    const assign = await new FluencyTestAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date(),
      averageSpeed: req.body.averageSpeed,
      assignment: req.body.assignment,
    }).save();

    res.send(assign);
  });

  app.post("/api/fluency/score/update", async (req, res) => {
    const infor = await Student.findByIdAndUpdate(req.user.id, {
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
    res.send({ paragraphs, questions, choices, answers });
  });

  app.get("/api/fluency/test/get", requireLogin, async (req, res) => {
    const testData = await FluencyTest.find();
    let paragraphs = [];
    let questions = [];
    let choices = [];
    let answers = [];
    await testData.forEach((dataset) => {
      paragraphs.push(dataset.paragraph);
      questions.push(dataset.question);
      choices.push(dataset.choices);
      answers.push(dataset.answer);
    });
    res.send({ paragraphs, questions, choices, answers });
  });

  // tutor side

  // test
  app.post("/api/fluency/score/create", async (req, res) => {
    const infor = await Student.findByIdAndUpdate(
      req.body.assignment.studentId,
      {
        fluency_curr_score: req.body.finalSpeed,
      }
    );
    await FluencyTestAssign.findByIdAndUpdate(req.body.assignment._id, {
      status: "done",
    });
    res.send(infor);
  });

  app.get("/api/fluency/test/assign/getall", async (req, res) => {
    const assignments = await FluencyTestAssign.find();
    res.send(assignments);
  });

  app.get("/api/fluency/test/assign/getone/:id", async (req, res) => {
    const assignment = await FluencyTestAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.get("/api/fluency/test/gettable", requireTutor, async (req, res) => {
    let data = [];
    const testdata = await FluencyTest.find();
    testdata.forEach((test) => {
      const dict = {
        paragraph: test.paragraph,
        question: test.question,
        choices: test.choices,
        answer: test.answer,
        id: test._id,
      };
      data.push(dict);
    });
    res.send(data);
  });

  app.post("/api/fluency/test/add", requireTutor, async (req, res) => {
    const data = await new FluencyTest(req.body.data).save();
    res.send(data);
  });

  app.post("/api/fluency/test/delete", requireTutor, async (req, res) => {
    const data = await FluencyTest.findByIdAndDelete(req.body.id);
    res.send(data);
  });

  // train
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
