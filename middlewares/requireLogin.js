module.exports = (req, res, next) => {
  if (!req.user) res.send({ err: "Must login!" });
  next();
};
