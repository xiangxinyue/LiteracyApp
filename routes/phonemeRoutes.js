const requireLogin = require("../middlewares/requireLogin");
const requireTutor = require("../middlewares/requireTutor");
const mongoose = require("mongoose");
const PhonemeTest = mongoose.model("phoneme_tests");
const PhonemeTrain = mongoose.model("phoneme_trains");
const PhonemeUser = mongoose.model("phoneme_user");
const PhonemeAssign = mongoose.model("phoneme_assigns");
const User = mongoose.model("users");
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

  app.post("/api/phoneme/score/update", async (req, res) => {
    const infor = await User.updateOne(
      { _id: req.user._id },
      { phoneme_curr_score: req.body.newScore }
    ).catch((err) => console.log(err));
    res.send(infor);
  });

  app.post("/api/phoneme/rightwrong/update", async (req, res) => {
    const { rightId, wrongId } = req.body;
    const doc = await PhonemeUser.findById(req.user._id);
    if (doc) {
      const newRightId = doc.rightId.concat(rightId);
      const newWrongId = doc.wrongId.concat(wrongId);
      await PhonemeUser.updateOne(
        { _id: req.user._id },
        { rightId: newRightId, wrongId: newWrongId }
      );
      res.send("Update ids");
    } else {
      const infor = await new PhonemeUser({
        _id: req.user._id,
        rightId,
        wrongId,
      }).save();
      res.send(infor);
    }
  });

  // Audio Recording
  app.get("/api/phoneme/audio/", requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid()}.mp3`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: keys.Bucket,
        ContentType: "audio/wav",
        Key: key,
      },
      (err, url) => res.send({ err, key, url })
    );
  });

  app.get("/api/phoneme/audio/get", async (req, res) => {
    const user = await User.findById(req.user.id);
    res.send(user.phoneme_audio);
  });

  // ---------------------------------------------------------------------------
  // Tutoe side
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

  app.post("/api/phoneme/assign/add", requireTutor, async (req, res) => {
    const data = await new PhonemeAssign({
      tutor: req.user.displayName,
      assignment: req.body.data,
    }).save();
    res.send(data);
  });
};
