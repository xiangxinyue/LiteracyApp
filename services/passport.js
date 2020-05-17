const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  // const tutor = await Tutor.findById(id);
  // const student = await Student.findById(id);

  const user = await User.findById(id);
  return callback(null, user);
});

passport.use(
  "google-student",
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google_student/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, callback) => {
      const doc = await User.findOne({ googleId: profile.id });
      if (doc) {
        return callback(null, doc);
      } else {
        const createdAt = new Date();
        const user = await new User({
          createdAt,
          role: "student",
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          fluency_score: { datasets: [], labels: [] },
          phoneme_score: { datasets: [], labels: [] },
          morp_awar_score: { datasets: [], labels: [] },
          orth_awar_score: { datasets: [], labels: [] },
          numeracy_score: { datasets: [], labels: [] },
          fluency_curr_score: -1,
          phoneme_curr_score: -1,
          morp_awar_curr_score: -1,
          orth_awar_curr_score: -1,
          numeracy_curr_score: -1,
        }).save();
        return callback(null, user);
      }
    }
  )
);

passport.use(
  "google-tutor",
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google_tutor/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, callback) => {
      console.log(profile);
      const doc = await User.findOne({ googleId: profile.id });
      if (doc) {
        return callback(null, doc);
      } else {
        const createdAt = new Date();
        const user = await new User({
          createdAt,
          role: "tutor",
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        }).save();
        return callback(null, user);
      }
    }
  )
);
