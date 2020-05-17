const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const PhonemeTest = mongoose.model("phoneme_tests");
const PhonemeTrain = mongoose.model("phoneme_trains");
const PhonemeUser = mongoose.model("phoneme_user");
const User = mongoose.model("users");

module.exports = (app) => {
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
};
