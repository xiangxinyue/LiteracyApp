const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const Tutor = mongoose.model("tutors");
const Student = mongoose.model("students");

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  const student = await Student.findById(id);
  if (student) {
    return callback(null, student);
  }
  const tutor = await Tutor.findById(id);
  if (tutor) {
    return callback(null, tutor);
  }
  callback(null, null);
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/student/callback",
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
          fluency_score: [],
          phoneme_score: [],
          print_score: [],
          meaning_score: [],
        }).save();
        return callback(null, student);
      }
    }
  )
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, callback) => {
      const user = await Tutor.findOne({ email: email });
      if (!user) return callback(null, false);
      if (password === user.password) return callback(null, user);
      else return callback(null, false);
    }
  )
);
