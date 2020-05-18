module.exports = (req, res, next) => {
  if (!req.user && req.user.role !== "tutor") res.send({ err: "Must Tutor!" });
  next();
};
