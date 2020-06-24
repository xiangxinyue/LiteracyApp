const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
const { json } = require("body-parser");
app.use(json());
const mongoose = require("mongoose");
const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));
mongoose.set("useFindAndModify", false);
app.use(
  cookieSession({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./models/student");
require("./models/tutor");
require("./models/fluency");
require("./models/phoneme");
require("./models/print");

require("./services/passport");
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/phonemeRoutes")(app);
require("./routes/fluencyRoutes")(app);
require("./routes/printRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Listen to 4000"));
