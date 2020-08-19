const mongoose = require("mongoose");
const PrintQ1 = mongoose.model("print_q1");
const PrintQ2 = mongoose.model("print_q2");
const PrintQ3 = mongoose.model("print_q3");
const Student = mongoose.model("students");
const PrintTestAssign = mongoose.model("print_test_assigns");
const PrintAssignAssign = mongoose.model("print_assign_assigns");
const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");

module.exports = (app) => {
  // tutor side
  // get all data
  app.get("/api/print/q1", async (req, res) => {
    const q1 = await PrintQ1.find();
    res.send(q1);
  });
  app.get("/api/print/q2", async (req, res) => {
    const q2 = await PrintQ2.find();
    res.send(q2);
  });
  app.get("/api/print/q3", async (req, res) => {
    const q3 = await PrintQ3.find();
    res.send(q3);
  });

  // add one data
  app.post("/api/print/q1", async (req, res) => {
    const { level, question, answer } = req.body;
    await new PrintQ1({ level, question, answer }).save();
    res.send({});
  });

  app.post("/api/print/q2", async (req, res) => {
    const { level, question, choices, answer } = req.body;
    await new PrintQ2({ level, question, choices, answer }).save();
    res.send({});
  });

  app.post("/api/print/q3", async (req, res) => {
    const { level, question, choices } = req.body;
    await new PrintQ3({ level, question, choices }).save();
    res.send({});
  });

  // delete one data
  app.delete("/api/print/q1/:id", async (req, res) => {
    await PrintQ1.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/print/q2/:id", async (req, res) => {
    await PrintQ2.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.delete("/api/print/q3/:id", async (req, res) => {
    await PrintQ3.findByIdAndDelete(req.params.id);
    res.send({});
  });

  // student data
  app.get("/api/print/student/test", async (req, res) => {
    const q1 = await PrintQ1.find();
    const q2 = await PrintQ2.find();
    const q3 = await PrintQ3.find();
    res.send({ q1, q2, q3 });
  });

  app.get("/api/print/student/assign", async (req, res) => {
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

  app.put("/api/print/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.print_assign_score;
    newArray.push({
      label: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      print_assign_score: newArray,
    });
    res.send({});
  });

  // students assignment
  app.post("/api/print/test", requireLogin, async (req, res) => {
    await new PrintTestAssign({
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

  app.get("/api/print/test", async (req, res) => {
    const assigns = await PrintTestAssign.find();
    res.send(assigns);
  });

  app.get("/api/print/test/:id", async (req, res) => {
    const assign = await PrintTestAssign.findById(req.params.id);
    res.send(assign);
  });

  app.post("/api/print/assign", requireLogin, async (req, res) => {
    await new PrintAssignAssign({
      studentId: req.user.id,
      studentName: req.user.displayName,
      studentEmail: req.user.email,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      q1Assign: req.body.q1Assign,
      q2Assign: req.body.q2Assign,
      q3Assign: req.body.q3Assign,
      oldScore: req.user.print_curr_score,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.get("/api/print/assign", async (req, res) => {
    const assigns = await PrintAssignAssign.find();
    res.send(assigns);
  });

  app.get("/api/print/assign/:id", async (req, res) => {
    const assign = await PrintAssignAssign.findById(req.params.id);
    res.send(assign);
  });

  // history performance
  app.get("/api/print/historyscore/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send({
      assignScore: student.print_assign_score,
    });
  });
};
