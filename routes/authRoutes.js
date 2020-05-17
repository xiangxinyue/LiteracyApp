const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google_student",
    passport.authenticate("google-student", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google_student/callback",
    passport.authenticate("google-student"),
    (req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

  app.get(
    "/auth/google_tutor",
    passport.authenticate("google-tutor", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google_tutor/callback",
    passport.authenticate("google-tutor"),
    (req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
  });

  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });
};
