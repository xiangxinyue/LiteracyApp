const mongoose = require("mongoose");
const MeaningQ1 = mongoose.model("meaning_q1");
const MeaningQ2 = mongoose.model("meaning_q2");
const MeaningQ3 = mongoose.model("meaning_q3");
const Student = mongoose.model("students");
const MeaningTestAssign = mongoose.model("meaning_test_assigns");
const MeaningAssignAssign = mongoose.model("meaning_assign_assigns");
const MeaningMaterial = mongoose.model("meaning_materials");
const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId: keys.AWSKeyId,
  secretAccessKey: keys.AWSSecretKey,
  region: keys.Region,
});
module.exports = (app) => {
  // tutor side
  // get all data
  app.get("/api/meaning/q1", async (req, res) => {
    const q1 = await MeaningQ1.find();
    res.send(q1);
  });
  app.get("/api/meaning/q2", async (req, res) => {
    const q2 = await MeaningQ2.find();
    res.send(q2);
  });
  app.get("/api/meaning/q3", async (req, res) => {
    const q3 = await MeaningQ3.find();
    res.send(q3);
  });

  // add one data
  app.post("/api/meaning/q1", async (req, res) => {
    const { level, question, answer } = req.body;
    await new MeaningQ1({ level, question, answer }).save();
    res.send({});
  });

  app.post("/api/meaning/q2", async (req, res) => {
    const { level, question, answer } = req.body;
    await new MeaningQ2({ level, question, answer }).save();
    res.send({});
  });

  app.post("/api/meaning/q3", async (req, res) => {
    const { level, question, choices, answer } = req.body;
    await new MeaningQ3({ level, question, choices, answer }).save();
    res.send({});
  });

  // delete one data
  app.delete("/api/meaning/q1/:id", async (req, res) => {
    await MeaningQ1.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/meaning/q2/:id", async (req, res) => {
    await MeaningQ2.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/meaning/q3/:id", async (req, res) => {
    await MeaningQ3.findByIdAndDelete(req.params.id);
    res.send({});
  });

  // student data
  app.get("/api/meaning/student/test", async (req, res) => {
    const q1 = await MeaningQ1.find();
    const q2 = await MeaningQ2.find();
    const q3 = await MeaningQ3.find();
    res.send({ q1, q2, q3 });
  });

  app.get("/api/meaning/student/assign", async (req, res) => {
    const q1 = await MeaningQ1.find();
    const q2 = await MeaningQ2.find();
    const q3 = await MeaningQ3.find();
    res.send({ q1, q2, q3 });
  });

  // update score
  app.put("/api/meaning/score", async (req, res) => {
    await Student.findByIdAndUpdate(req.user.id, {
      meaning_curr_score: req.body.newScore,
    });
    res.send({});
  });

  app.put("/api/meaning/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.meaning_assign_score;
    newArray.push({
      label: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      meaning_assign_score: newArray,
    });
    res.send({});
  });

  // students assignment
  app.post("/api/meaning/test", requireLogin, async (req, res) => {
    await new MeaningTestAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.get("/api/meaning/test", async (req, res) => {
    const assigns = await MeaningTestAssign.find();
    res.send(assigns);
  });

  app.get("/api/meaning/test/:id", async (req, res) => {
    const assign = await MeaningTestAssign.findById(req.params.id);
    res.send(assign);
  });

  app.post("/api/meaning/assign", requireLogin, async (req, res) => {
    await new MeaningAssignAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      oldScore: req.user.meaning_curr_score,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.get("/api/meaning/assign", async (req, res) => {
    const assigns = await MeaningAssignAssign.find();
    res.send(assigns);
  });

  app.get("/api/meaning/assign/:id", async (req, res) => {
    const assign = await MeaningAssignAssign.findById(req.params.id);
    res.send(assign);
  });

  // history performance
  app.get("/api/meaning/historyscore/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send({
      assignScore: student.meaning_assign_score,
    });
  });

  // materials
  app.get("/api/meaning/materials", async (req, res) => {
    const data = await MeaningMaterial.find();
    res.send(data[0]);
  });

  app.put("/api/meaning/materials/:id", async (req, res) => {
    await MeaningMaterial.findByIdAndUpdate(req.params.id, req.body);
    res.send({});
  });

  app.post("/api/meaning/masterials", async (req, res) => {
    const data = await new MeaningMaterial(req.body).save();
    res.send(data);
  });

  app.get("/api/meaning/video", requireLogin, async (req, res) => {
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
};
