const mongoose = require("mongoose");
const Student = mongoose.model("students");

module.exports = (app) => {
  app.post("/api/user/phoneme_audio/update", async (req, res) => {
    const user = await Student.findById(req.user.id);
    let audios = user.phoneme_audio;
    audios.push(req.body.audioUrl);
    await User.findByIdAndUpdate(req.user.id, { phoneme_audio: audios });
    res.send({});
  });
};
