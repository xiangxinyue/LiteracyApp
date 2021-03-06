const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const mongoose = require("mongoose");
const PhonemePhoneme = mongoose.model("phoneme_phonemes");
const PhonemeAudio = mongoose.model("phoneme_audios");
const PhonemeTestAssign = mongoose.model("phoneme_test_assigns");
const PhonemeAssignAssign = mongoose.model("phoneme_assign_assigns");
const PhonemeMaterial = mongoose.model("phoneme_materials");
const PhonemeProgressAssign = mongoose.model("phoneme_progress_assigns");
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
  app.get("/api/phoneme/phonemes", requireLogin, async (req, res) => {
    const phonemeData = await PhonemePhoneme.find();
    let words = [];
    let phonemes = [];
    let levels = [];
    let ids = [];
    await phonemeData.forEach((dataset) => {
      words.push(dataset.word);
      phonemes.push(dataset.phoneme);
      levels.push(dataset.level);
      ids.push(dataset._id);
    });
    res.send({ words, phonemes, levels, ids });
  });

  app.get("/api/phoneme/audios", requireLogin, async (req, res) => {
    const audioData = await PhonemeAudio.find();
    let questions = [];
    let audios = [];
    let levels = [];
    let ids = [];
    await audioData.forEach((dataset) => {
      questions.push(dataset.question);
      audios.push(dataset.audios);
      levels.push(dataset.level);
      ids.push(dataset._id);
    });
    res.send({ questions, audios, levels, ids });
  });

  app.post("/api/phoneme/test", async (req, res) => {
    await new PhonemeTestAssign({
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      phonemeAssign: req.body.phonemeAssign,
      studentId: req.user.id,
      studentEmail: req.user.email,
      studentName: req.user.displayName,
      newScore: req.body.newScore,
    }).save();
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

  app.post("/api/phoneme/student/assign", requireLogin, async (req, res) => {
    const { phoneme_score } = req.user;
    await new PhonemeAssignAssign({
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "America/Denver",
      }),
      phonemeAssign: req.body.phonemeAssign,
      audioAssign: req.body.audioAssign,
      studentId: req.user.id,
      studentEmail: req.user.email,
      studentName: req.user.displayName,
      oldScore: phoneme_score[phoneme_score.length - 1]["value"],
      status: "pending",
    }).save();
    res.send({});
  });

  // materials
  app.get("/api/phoneme/materials", async (req, res) => {
    const data = await PhonemeMaterial.find();
    res.send(data[0]);
  });

  app.put("/api/phoneme/materials/:id", async (req, res) => {
    await PhonemeMaterial.findByIdAndUpdate(req.params.id, req.body);
    res.send({});
  });
  app.post("/api/phoneme/masterials", async (req, res) => {
    const data = await new PhonemeMaterial(req.body).save();
    res.send(data);
  });

  app.get("/api/phoneme/video", requireLogin, async (req, res) => {
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

  // progress assign
  app.put("/api/phoneme/student/progress", async (req, res) => {
    const data = await Student.findById(req.user.id);
    await Student.findByIdAndUpdate(req.user.id, {
      phoneme_progress: req.body.newProgress,
    });
    res.send(data.phoneme_progress);
  });

  app.get("/api/phoneme/student/progress/:id", async (req, res) => {
    const assign = await PhonemeProgressAssign.findById(req.params.id);
    res.send(assign);
  });

  app.delete("/api/phoneme/student/progress/:id", async (req, res) => {
    await PhonemeProgressAssign.findByIdAndDelete(req.params.id);
    res.send({});
  });

  app.post("/api/phoneme/student/progress", async (req, res) => {
    const progress = await new PhonemeProgressAssign({
      ...req.body,
    }).save();
    res.send(progress);
  });

  // ---------------------------------------------------------------------------
  // Tutor side

  // database
  app.get("/api/phoneme/phoneme/table", requireTutor, async (req, res) => {
    const phonemeDate = await PhonemePhoneme.find();
    res.send(phonemeDate);
  });

  app.post("/api/phoneme/phoneme", requireTutor, async (req, res) => {
    const phonemeDate = await new PhonemePhoneme(req.body).save();
    res.send(phonemeDate);
  });

  app.delete("/api/phoneme/phoneme/:id", requireTutor, async (req, res) => {
    const phonemeDate = await PhonemePhoneme.findByIdAndDelete(req.params.id);
    res.send(phonemeDate);
  });

  app.get("/api/phoneme/audio/table", requireTutor, async (req, res) => {
    const audioData = await PhonemeAudio.find();
    res.send(audioData);
  });

  app.post("/api/phoneme/audio", requireTutor, async (req, res) => {
    const audioData = await new PhonemeAudio(req.body).save();
    res.send(audioData);
  });

  app.delete("/api/phoneme/audio/:id", requireTutor, async (req, res) => {
    const audioData = await PhonemeAudio.findByIdAndDelete(req.params.id);
    res.send(audioData);
  });

  // assignments
  app.get("/api/phoneme/assign", requireTutor, async (req, res) => {
    const assignments = await PhonemeAssignAssign.find();
    res.send(assignments);
  });

  app.get("/api/phoneme/assign/:id", requireTutor, async (req, res) => {
    const assignment = await PhonemeAssignAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.get("/api/phoneme/test", async (req, res) => {
    const assignments = await PhonemeTestAssign.find();
    res.send(assignments);
  });

  app.get("/api/phoneme/test/:id", async (req, res) => {
    const assignment = await PhonemeTestAssign.findById(req.params.id);
    res.send(assignment);
  });

  app.post("/api/phoneme/score", requireLogin, async (req, res) => {
    await Student.findByIdAndUpdate(req.user.id, {
      phoneme_score: [
        {
          label: new Date().toLocaleString("en-US", {
            timeZone: "America/Denver",
          }),
          value: req.body.newScore,
        },
      ],
    });
    res.send({});
  });

  app.put("/api/phoneme/score", requireTutor, async (req, res) => {
    const student = await Student.findById(req.body.studentId);
    const newArray = student.phoneme_score;
    const assignDate = req.body.assignDate;
    newArray.push({
      label: assignDate,
      value: req.body.newScore,
    });
    const infor = await Student.findByIdAndUpdate(req.body.studentId, {
      phoneme_score: newArray,
    }).catch((err) => console.log(err));

    await PhonemeAssignAssign.findByIdAndUpdate(req.body.assignId, {
      status: "done",
    });
    res.send(infor);
  });

  app.get("/api/phoneme/historyscore/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send({
      assignScore: student.phoneme_score,
    });
  });
};
