const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const config = require("./config");
const rootDir = require("./util/path");
const prescription = require("./router/prescription");
const feed = require("./router/feed");
const template = require("./router/templete");
const index = require("./router/indexRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use("/", index);
app.use("/prescription", prescription);
app.use(prescription);
app.use("/feed", feed);
// app.use("/prescription", template);

app.use((req, res, next) => {
  // res.status(404).send("<h2>" + req.path + " NOT FOUND</h2>");
  res.status(404).render("error.ejs",{errorCode:404,errorText:"Data Not Found"})
});

app.listen(3000);
