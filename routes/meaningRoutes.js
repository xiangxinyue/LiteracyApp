const mongoose = require("mongoose");
const MeaningQ1 = mongoose.model("meaning_q1");
const MeaningQ2 = mongoose.model("meaning_q2");
const MeaningQ3 = mongoose.model("meaning_q3");
const Student = mongoose.model("students");
const MeaningTestAssign = mongoose.model("meaning_test_assigns");
const MeaningTrainAssign = mongoose.model("meaning_train_assigns");
const MeaningEvalAssign = mongoose.model("meaning_eval_assigns");
const MeaningEval = mongoose.model("meaning_evals");
const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");

module.exports = (app) => {
  // tutor side
  // get all data
  app.get("/api/meaning/q1/alldata", async (req, res) => {
    const q1 = await MeaningQ1.find();
    res.send(q1);
  });
  app.get("/api/meaning/q2/alldata", async (req, res) => {
    const q2 = await MeaningQ2.find();
    res.send(q2);
  });
  app.get("/api/meaning/q3/alldata", async (req, res) => {
    const q3 = await MeaningQ3.find();
    res.send(q3);
  });

  // add one data
  app.post("/api/meaning/q1/onedata", async (req, res) => {
    const { level, question, answer } = req.body;
    await new MeaningQ1({ level, question, answer }).save();
    res.send({});
  });

  app.post("/api/meaning/q2/onedata", async (req, res) => {
    const { level, question, answer } = req.body;
    await new MeaningQ2({ level, question, answer }).save();
    res.send({});
  });

  app.post("/api/meaning/q3/onedata", async (req, res) => {
    const { level, question, answer } = req.body;
    await new MeaningQ3({ level, question, answer }).save();
    res.send({});
  });

  // delete one data
  app.delete("/api/meaning/q1/onedata/:id", async (req, res) => {
    await MeaningQ1.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/meaning/q2/onedata/:id", async (req, res) => {
    await MeaningQ2.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/meaning/q3/onedata/:id", async (req, res) => {
    await MeaningQ3.findByIdAndDelete(req.params.id);
    res.send({});
  });

  // assignment
  app.post("/api/meaning/eval", requireTutor, async (req, res) => {
    const data = await new MeaningEval({
      tutor: req.user.displayName,
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      createAt: req.body.schedule,
      status: "pending",
    }).save();
    res.send(data);
  });

  setInterval(async () => {
    console.log("Running Meaning Assign check daily!");
    const doc = await MeaningEval.find();
    const latest = doc.pop();
    if (latest && latest.createAt < new Date()) {
      await MeaningEval.findByIdAndUpdate(latest._id, { status: "done" });
    }
  }, 43200000);

  app.get("/api/meaning/eval", async (req, res) => {
    const assignments = await MeaningEval.find();
    while (assignments.length > 0) {
      const currAssign = assignments.pop();
      if (currAssign.status === "done") {
        return res.send(currAssign);
      }
    }
    res.send({});
  });

  // student data
  app.get("/api/meaning/testdata", async (req, res) => {
    const q1 = await MeaningQ1.find();
    const q2 = await MeaningQ2.find();
    const q3 = await MeaningQ3.find();
    res.send({ q1, q2, q3 });
  });

  app.get("/api/meaning/traindata", async (req, res) => {
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

  app.put("/api/meaning/train/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.meaning_train_score;
    newArray.push({
      label: new Date(),
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      meaning_train_score: newArray,
    });
    res.send({});
  });

  app.put("/api/meaning/eval/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.meaning_eval_score;
    newArray.push({
      label: req.body.assignDate,
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      meaning_eval_score: newArray,
    });
    res.send({});
  });

  // students assignment
  app.post("/api/meaning/testassign", requireLogin, async (req, res) => {
    await new MeaningTestAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date(),
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.get("/api/meaning/testassign", async (req, res) => {
    const assigns = await MeaningTestAssign.find();
    res.send(assigns);
  });

  app.get("/api/meaning/testassign/:id", async (req, res) => {
    const assign = await MeaningTestAssign.findById(req.params.id);
    res.send(assign);
  });

  app.post("/api/meaning/trainassign", requireLogin, async (req, res) => {
    await new MeaningTrainAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date(),
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      oldScore: req.user.meaning_curr_score,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.get("/api/meaning/trainassign", async (req, res) => {
    const assigns = await MeaningTrainAssign.find();
    res.send(assigns);
  });

  app.get("/api/meaning/trainassign/:id", async (req, res) => {
    const assign = await MeaningTrainAssign.findById(req.params.id);
    res.send(assign);
  });

  app.post("/api/meaning/evalassign", requireLogin, async (req, res) => {
    await new MeaningEvalAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date(),
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      oldScore: req.user.print_curr_score,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.get("/api/meaning/evalassign", async (req, res) => {
    const assigns = await MeaningEvalAssign.find();
    res.send(assigns);
  });

  app.get("/api/meaning/evalassign/:id", async (req, res) => {
    const assign = await MeaningEvalAssign.findById(req.params.id);
    res.send(assign);
  });

  // history performance
  app.get("/api/meaning/historyscore/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send({
      trainScore: student.meaning_train_score,
      evalScore: student.meaning_eval_score,
    });
  });
};
