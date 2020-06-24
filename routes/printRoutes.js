const mongoose = require("mongoose");
const PrintQ1 = mongoose.model("print_q1");
const PrintQ2 = mongoose.model("print_q2");
const PrintQ3 = mongoose.model("print_q3");
const Student = mongoose.model("students");

module.exports = (app) => {
  // student side
  // get data
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
  app.post("/api/print/score", async (req, res) => {
    await Student.findByIdAndUpdate(req.user.id, {
      print_curr_score: req.body.score,
    });
    res.send({});
  });

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
};
