const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
//static assets
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Importing routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html-routes.js"));

app.listen(PORT, () => {
  console.log(`====> App running at http://localhost:${PORT} <====`);
});
