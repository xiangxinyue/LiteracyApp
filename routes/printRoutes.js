const mongoose = require("mongoose");
const PrintQ1 = mongoose.model("print_q1");
const PrintQ2 = mongoose.model("print_q2");
const PrintQ3 = mongoose.model("print_q3");
const Student = mongoose.model("students");
const PrintTestAssign = mongoose.model("print_test_assigns");
const PrintTrainAssign = mongoose.model("print_train_assigns");
const PrintEvalAssign = mongoose.model("print_eval_assigns");
const PrintEval = mongoose.model("print_evals");
const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");

module.exports = (app) => {
  // tutor side
  // get all data
  app.get("/api/print/q1/alldata", async (req, res) => {
    const q1 = await PrintQ1.find();
    res.send(q1);
  });
  app.get("/api/print/q2/alldata", async (req, res) => {
    const q2 = await PrintQ2.find();
    res.send(q2);
  });
  app.get("/api/print/q3/alldata", async (req, res) => {
    const q3 = await PrintQ3.find();
    res.send(q3);
  });

  // add one data
  app.post("/api/print/q1/onedata", async (req, res) => {
    const { level, question, answer } = req.body;
    await new PrintQ1({ level, question, answer }).save();
    res.send({});
  });

  app.post("/api/print/q2/onedata", async (req, res) => {
    const { level, question, choices, answer } = req.body;
    await new PrintQ2({ level, question, choices, answer }).save();
    res.send({});
  });

  app.post("/api/print/q3/onedata", async (req, res) => {
    const { level, question, choices } = req.body;
    await new PrintQ3({ level, question, choices }).save();
    res.send({});
  });
  // delete one data
  app.delete("/api/print/q1/onedata/:id", async (req, res) => {
    await PrintQ1.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/print/q2/onedata/:id", async (req, res) => {
    await PrintQ2.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/print/q3/onedata/:id", async (req, res) => {
    await PrintQ3.findByIdAndDelete(req.params.id);
    res.send({});
  });
  // assignment
  app.post("/api/print/eval", requireTutor, async (req, res) => {
    const data = await new PrintEval({
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
    console.log("Running Phoneme Assign check daily!");
    const doc = await PrintEval.find();
    const latest = doc.pop();
    if (latest && latest.createAt < new Date()) {
      await PrintEval.findByIdAndUpdate(latest._id, { status: "done" });
    }
  }, 43200000);

  app.get("/api/print/eval", async (req, res) => {
    const assignments = await PrintEval.find();
    while (assignments.length > 0) {
      const currAssign = assignments.pop();
      if (currAssign.status === "done") {
        return res.send(currAssign);
      }
    }
    res.send({});
  });

  // student data
  app.get("/api/print/testdata", async (req, res) => {
    const q1 = await PrintQ1.find();
    const q2 = await PrintQ2.find();
    const q3 = await PrintQ3.find();
    res.send({ q1, q2, q3 });
  });

  app.get("/api/print/traindata", async (req, res) => {
    const q1 = await PrintQ1.find();
    const q2 = await PrintQ2.find();
    const q3 = await PrintQ3.find();
    res.send({ q1, q2, q3 });
  });

  // update score
  app.put("/api/print/score", async (req, res) => {
    await Student.findByIdAndUpdate(req.user.id, {
      print_curr_score: req.body.newScore,
    });
    res.send({});
  });

  app.put("/api/print/train/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.print_train_score;
    newArray.push({
      label: new Date(),
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      print_train_score: newArray,
    });
    res.send({});
  });

  app.put("/api/print/eval/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.print_eval_score;
    newArray.push({
      label: req.body.assignDate,
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      print_eval_score: newArray,
    });
    res.send({});
  });

  // students assignment
  app.post("/api/print/testassign", requireLogin, async (req, res) => {
    await new PrintTestAssign({
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

  app.get("/api/print/testassign", async (req, res) => {
    const assigns = await PrintTestAssign.find();
    res.send(assigns);
  });

  app.get("/api/print/testassign/:id", async (req, res) => {
    const assign = await PrintTestAssign.findById(req.params.id);
    res.send(assign);
  });

  app.post("/api/print/trainassign", requireLogin, async (req, res) => {
    await new PrintTrainAssign({
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

  app.get("/api/print/trainassign", async (req, res) => {
    const assigns = await PrintTrainAssign.find();
    res.send(assigns);
  });

  app.get("/api/print/trainassign/:id", async (req, res) => {
    const assign = await PrintTrainAssign.findById(req.params.id);
    res.send(assign);
  });

  app.post("/api/print/evalassign", requireLogin, async (req, res) => {
    await new PrintEvalAssign({
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

  app.get("/api/print/evalassign", async (req, res) => {
    const assigns = await PrintEvalAssign.find();
    res.send(assigns);
  });

  app.get("/api/print/evalassign/:id", async (req, res) => {
    const assign = await PrintEvalAssign.findById(req.params.id);
    res.send(assign);
  });
};
