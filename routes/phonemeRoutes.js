const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const mongoose = require("mongoose");
const PhonemeTest = mongoose.model("phoneme_tests");
const PhonemeTrain = mongoose.model("phoneme_trains");
const PhonemeUser = mongoose.model("phoneme_user");
const PhonemeAssign = mongoose.model("phoneme_assigns");
const PhonemeEvalAssign = mongoose.model("phoneme_eval_assigns");
const PhonemeTestAssign = mongoose.model("phoneme_test_assigns");
const PhonemeTrainAssign = mongoose.model("phoneme_train_assigns");
const Tutor = mongoose.model("tutors");
const Student = mongoose.model("students");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId: keys.AWSKeyId,
  secretAccessKey: keys.AWSSecretKey,
  region: keys.Region,
});

module.exports = (app) => {
  // Student side
  // test part
  app.get("/api/phoneme/test/get", requireLogin, async (req, res) => {
    const testData = await PhonemeTest.find();
    let words = [];
    let phonemes = [];
    let levels = [];
    let id = [];
    await testData.forEach((dataset) => {
      words.push(dataset.word);
      phonemes.push(dataset.phoneme);
      levels.push(dataset.level);
      id.push(dataset._id);
    });
    res.send({ words, phonemes, levels, id });
  });

  app.post("/api/phoneme/currscore/update", requireLogin, async (req, res) => {
    await Student.findByIdAndUpdate(req.user.id, {
      phoneme_curr_score: req.body.newScore,
    });
    res.send({});
  });

  app.post("/api/phoneme/testassign", async (req, res) => {
    await new PhonemeTestAssign({
      createAt: new Date(),
      phonemeAssign: req.body.phonemeAssign,
      studentId: req.user.id,
      studentEmail: req.user.email,
      studentName: req.user.displayName,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  // train part
  app.get("/api/phoneme/train/get", requireLogin, async (req, res) => {
    const trainData = await PhonemeTrain.find();
    let words = [];
    let phonemes = [];
    let levels = [];
    let id = [];
    await trainData.forEach((dataset) => {
      words.push(dataset.word);
      phonemes.push(dataset.phoneme);
      levels.push(dataset.level);
      id.push(dataset._id);
    });
    res.send({ words, phonemes, levels, id });
  });

  app.post("/api/phoneme/rightwrong/update", requireLogin, async (req, res) => {
    const { rightId, wrongId } = req.body;
    const doc = await PhonemeUser.findById(req.user.id);
    if (doc) {
      const newRightId = doc.rightId.concat(rightId);
      const newWrongId = doc.wrongId.concat(wrongId);
      await PhonemeUser.findByIdAndUpdate(req.user.id, {
        rightId: newRightId,
        wrongId: newWrongId,
      });
      res.send("Update ids");
    } else {
      const infor = await new PhonemeUser({
        _id: req.user.id,
        rightId,
        wrongId,
      }).save();
      res.send(infor);
    }
  });

  app.post("/api/phoneme/trainassign", async (req, res) => {
    await new PhonemeTrainAssign({
      createAt: new Date(),
      phonemeAssign: req.body.phonemeAssign,
      studentId: req.user.id,
      studentEmail: req.user.email,
      studentName: req.user.displayName,
      oldScore: req.user.phoneme_curr_score,
      newScore: req.body.newScore,
    }).save();
    res.send({});
  });

  app.post("/api/phoneme/train/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.phoneme_train_score;
    newArray.push({
      label: new Date(),
      value: req.body.newScore,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      phoneme_train_score: newArray,
    });
    res.send({});
  });

  // evaluation
  app.get("/api/phoneme/audio", requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid()}.mp3`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: keys.Bucket,
        ContentType: "audio/*",
        Key: key,
      },
      (err, url) => res.send({ err, key, url })
    );
  });

  app.get("/api/phoneme/student/evalassign", requireLogin, async (req, res) => {
    const assignments = await PhonemeAssign.find();
    while (assignments.length > 0) {
      const currAssign = assignments.pop();
      if (currAssign.status === "done") {
        return res.send(currAssign);
      }
    }
    res.send({});
  });

  app.post(
    "/api/phoneme/student/evalassign",
    requireLogin,
    async (req, res) => {
      await new PhonemeEvalAssign({
        createAt: new Date(),
        phonemeAssign: req.body.phonemeAssign,
        audioAssign: req.body.audioAssign,
        studentId: req.user.id,
        studentEmail: req.user.email,
        studentName: req.user.displayName,
        oldScore: req.user.phoneme_curr_score,
        assignId: req.body.assignId,
        assignDate: req.body.assignDate,
        status: "pending",
      }).save();
      res.send({});
    }
  );

  app.post("/api/phoneme/eval/historyscore", async (req, res) => {
    const user = await Student.findById(req.user.id);
    const newArray = user.phoneme_eval_score;
    newArray.push({
      label: req.body.assignDate,
      value: 0,
    });
    await Student.findByIdAndUpdate(req.user.id, {
      phoneme_eval_score: newArray,
    });
    res.send({});
  });

  // ---------------------------------------------------------------------------
  // Tutor side

  // database
  app.get("/api/phoneme/train/gettable", requireTutor, async (req, res) => {
    const traindata = await PhonemeTrain.find();
    res.send(traindata);
  });

  app.get("/api/phoneme/test/gettable", requireTutor, async (req, res) => {
    const testdata = await PhonemeTest.find();
    res.send(testdata);
  });

  app.post("/api/phoneme/train/add", requireTutor, async (req, res) => {
    const traindata = await new PhonemeTrain(req.body.data).save();
    res.send(traindata);
  });

  app.post("/api/phoneme/train/delete", requireTutor, async (req, res) => {
    const data = await PhonemeTrain.findByIdAndDelete(req.body.id);
    res.send(data);
  });

  app.post("/api/phoneme/test/add", requireTutor, async (req, res) => {
    const testdata = await new PhonemeTest(req.body.data).save();
    res.send(testdata);
  });

  app.post("/api/phoneme/test/delete", requireTutor, async (req, res) => {
    const data = await PhonemeTest.findByIdAndDelete(req.body.id);
    res.send(data);
  });

  app.get("/api/phoneme/train/historyscore", async (req, res) => {
    const students = await Student.find();
    const scores = students.map((student) => {
      if (student.phoneme_train_score.dates.length !== 0) {
        return {
          studentName: student.displayName,
          studentEmail: student.email,
          dates: student.phoneme_train_score.dates,
          scores: student.phoneme_train_score.scores,
        };
      }
    });
    res.send(scores);
  });

  // assignments
  app.post("/api/phoneme/evalassign/add", requireTutor, async (req, res) => {
    const data = await new PhonemeAssign({
      tutor: req.user.displayName,
      phonemeAssign: req.body.phonemeAssign,
      audioAssign: req.body.audioAssign,
      createAt: req.body.schedule,
      status: "pending",
    }).save();
    res.send(data);
  });

  setInterval(async () => {
    console.log("Running Phoneme Assign check daily!");
    const doc = await PhonemeAssign.find();
    const latest = doc.pop();
    if (latest && latest.createAt < new Date()) {
      await PhonemeAssign.findByIdAndUpdate(latest._id, { status: "done" });
    }
  }, 43200000);

  app.get("/api/phoneme/evalassign", requireTutor, async (req, res) => {
    const assignments = await PhonemeEvalAssign.find();
    res.send(assignments);
  });

  app.get("/api/phoneme/evalassign/:id", requireTutor, async (req, res) => {
    const assignment = await PhonemeEvalAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.get("/api/phoneme/testassign", async (req, res) => {
    const assignments = await PhonemeTestAssign.find();
    res.send(assignments);
  });

  app.get("/api/phoneme/testassign/:id", async (req, res) => {
    const assignment = await PhonemeTestAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.get("/api/phoneme/trainassign", async (req, res) => {
    const assignments = await PhonemeTrainAssign.find();
    res.send(assignments);
  });

  app.get("/api/phoneme/trainassign/:id", async (req, res) => {
    const assignment = await PhonemeTrainAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.post("/api/phoneme/score/update", requireLogin, async (req, res) => {
    const student = await Student.findById(req.body.studentId);
    const newArray = student.phoneme_eval_score;
    const assignDate = newArray.pop().label;
    newArray.push({
      label: assignDate,
      value: req.body.newScore,
    });
    const infor = await Student.findByIdAndUpdate(req.body.studentId, {
      phoneme_curr_score: req.body.newScore,
      phoneme_eval_score: newArray,
    }).catch((err) => console.log(err));
    await PhonemeEvalAssign.findByIdAndUpdate(req.body.assignId, {
      status: "done",
    });
    res.send(infor);
  });

  app.get("/api/phoneme/historyscore/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send({
      trainScore: student.phoneme_train_score,
      evalScore: student.phoneme_eval_score,
    });
  });
};
