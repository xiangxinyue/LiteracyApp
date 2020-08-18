const passport = require("passport");
const mongoose = require("mongoose");
const Student = mongoose.model("students");

module.exports = (app) => {
  app.get(
    "/auth/student",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/student/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post(
    "/auth/tutor",
    passport.authenticate("local", {
      failureRedirect: "/tutor/signin",
    }),
    (req, res) => {
      res.status(200).send({ msg: true });
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/student", async (req, res) => {
    const students = await Student.find();
    res.send(students);
  });
};
