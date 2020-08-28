const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const mongoose = require("mongoose");
const Student = mongoose.model("students");
const FluencyData = mongoose.model("fluency_datas");
const FluencyTestAssign = mongoose.model("fluency_test_assigns");
const FluencyAssignAssign = mongoose.model("fluency_assign_assigns");
const FluencyMaterial = mongoose.model("fluency_materials");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId: keys.AWSKeyId,
  secretAccessKey: keys.AWSSecretKey,
  region: keys.Region,
});
module.exports = (app) => {
  // student
  // testing
  app.put("/api/fluency/score", async (req, res) => {
    const infor = await Student.findByIdAndUpdate(req.user.id, {
      fluency_curr_score: req.body.newSpeed,
    });
    res.send(infor);
  });
  app.post("/api/fluency/student/test", async (req, res) => {
    const assign = await new FluencyTestAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      averageSpeed: req.body.averageSpeed,
      assignment: req.body.assignment,
    }).save();

    res.send(assign);
  });

  app.get("/api/fluency/student/test", requireLogin, async (req, res) => {
    const testData = await FluencyData.find();
    let paragraphs = [];
    let questions = [];
    let choices = [];
    let answers = [];
    testData.forEach((dataset) => {
      paragraphs.push(dataset.paragraph);
      questions.push(dataset.question);
      choices.push(dataset.choices);
      answers.push(dataset.answer);
    });
    res.send({ paragraphs, questions, choices, answers });
  });

  // assign
  app.get("/api/fluency/student/assign", requireLogin, async (req, res) => {
    const assignData = await FluencyData.find();
    let paragraphs = [];
    let questions = [];
    let choices = [];
    let answers = [];
    await assignData.forEach((dataset) => {
      paragraphs.push(dataset.paragraph);
      questions.push(dataset.question);
      choices.push(dataset.choices);
      answers.push(dataset.answer);
    });
    res.send({ paragraphs, questions, choices, answers });
  });

  app.post("/api/fluency/student/assign", async (req, res) => {
    const assign = await new FluencyAssignAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      oldSpeed: req.user.fluency_curr_score,
      newSpeed: req.body.newSpeed,
      assignment: req.body.assignment,
    }).save();
    res.send(assign);
  });

  app.post("/api/fluency/assign/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.fluency_assign_score;
    newArray.push({
      label: new Date().toLocaleString("en-US", { timeZone: "America/Denver" }),
      value: req.body.newSpeed,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      fluency_assign_score: newArray,
    });
    res.send({});
  });

  // materials
  app.get("/api/fluency/materials", async (req, res) => {
    const data = await FluencyMaterial.find();
    res.send(data[0]);
  });

  app.put("/api/fluency/materials/:id", async (req, res) => {
    console.log(req.body);
    await FluencyMaterial.findByIdAndUpdate(req.params.id, req.body);
    res.send({});
  });

  app.post("/api/fluency/masterials", async (req, res) => {
    const data = await new FluencyMaterial(req.body).save();
    res.send(data);
  });

  app.get("/api/fluency/video", requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid()}.mp4`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: keys.Bucket,
        ContentType: "video/*",
        Key: key,
      },
      (err, url) => res.send({ err, key, url })
    );
  });

  //-------------------------------------------------------------
  // tutor side

  // test
  app.post("/api/fluency/score", async (req, res) => {
    const infor = await Student.findByIdAndUpdate(
      req.body.assignment.studentId,
      {
        fluency_curr_score: req.body.finalSpeed,
      }
    );
    res.send(infor);
  });

  app.get("/api/fluency/test", async (req, res) => {
    const assignments = await FluencyTestAssign.find();
    res.send(assignments);
  });

  app.get("/api/fluency/test/:id", async (req, res) => {
    const assignment = await FluencyTestAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.get("/api/fluency/data/table", requireTutor, async (req, res) => {
    const data = [];
    const testdata = await FluencyData.find();
    console.log(testdata);
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

  app.post("/api/fluency/test/", requireTutor, async (req, res) => {
    const data = await new FluencyData(req.body.data).save();
    res.send(data);
  });

  app.delete("/api/fluency/test", requireTutor, async (req, res) => {
    const data = await FluencyData.findByIdAndDelete(req.body.id);
    res.send(data);
  });

  // assign
  app.get("/api/fluency/assign/table", requireTutor, async (req, res) => {
    let data = [];
    const assigndata = await FluencyData.find();
    console.log(assigndata);
    assigndata.forEach((assign) => {
      const dict = {
        paragraph: assign.paragraph,
        question: assign.question,
        choices: assign.choices,
        answer: assign.answer,
        id: assign._id,
      };
      data.push(dict);
    });
    res.send(data);
  });

  app.post("/api/fluency/assign", requireTutor, async (req, res) => {
    const data = await new FluencyData(req.body.data).save();
    res.send(data);
  });

  app.delete("/api/fluency/assign", requireTutor, async (req, res) => {
    const data = await FluencyData.findByIdAndDelete(req.body.id);
    res.send(data);
  });

  app.get("/api/fluency/assign", async (req, res) => {
    const assignments = await FluencyAssignAssign.find();
    res.send(assignments);
  });

  app.get("/api/fluency/assign/:id", async (req, res) => {
    const assignment = await FluencyAssignAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.get("/api/fluency/historyscore/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send({
      assignScore: student.fluency_assign_score,
    });
  });
};
