const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const Tutor = mongoose.model("tutors");
const Student = mongoose.model("students");

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  const tutor = await Tutor.findById(id);
  if (tutor) {
    return callback(null, tutor);
  }
  const student = await Student.findById(id);
  if (student) {
    return callback(null, student);
  }
  callback(null, null);
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
      const doc = await Student.findOne({ googleId: profile.id });
      if (doc) {
        return callback(null, doc);
      } else {
        const createdAt = new Date();
        const student = await new Student({
          createdAt,
          role: "student",
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          fluency_score: { scores: [], dates: [] },
          phoneme_score: { scores: [], dates: [] },
          morp_awar_score: { scores: [], dates: [] },
          orth_awar_score: { scores: [], dates: [] },
          numeracy_score: { scores: [], dates: [] },
          fluency_curr_score: -1,
          phoneme_curr_score: -1,
          morp_awar_curr_score: -1,
          orth_awar_curr_score: -1,
          numeracy_curr_score: -1,
        }).save();
        return callback(null, student);
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
      const doc = await Tutor.findOne({ googleId: profile.id });
      if (doc) {
        return callback(null, doc);
      } else {
        const createdAt = new Date();
        const tutor = await new Tutor({
          createdAt,
          role: "tutor",
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        }).save();
        return callback(null, tutor);
      }
    }
  )
);
