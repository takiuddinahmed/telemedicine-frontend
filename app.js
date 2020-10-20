const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const rootDir = require("./util/path");
const prescription = require("./router/prescription");
const feed = require("./router/feed");
const template = require("./router/templete");
const index = require("./router/indexRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use("/", index);
app.use("/prescription", prescription);
app.use(prescription);
app.use("/feed", feed);
// app.use("/prescription", template);

app.use((req, res, next) => {
  res.status(404).send("<h2>" + req.path + " NOT FOUND</h2>");
});

app.listen(3000);
