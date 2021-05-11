const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSessionStore = require("express-mysql-session")(session);
const path = require("path");

const config = require("./config");
const dbconfig = require("./database/db_config");
const rootDir = require("./util/path");
const prescription = require("./router/prescription");
const feed = require("./router/feed");
const template = require("./router/templete");
const index = require("./router/indexRouter");
const adminRouter = require("./router/admin")
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

var sessionStore = new mysqlSessionStore(dbconfig);

app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use((req,res,next)=>{
  console.log(req.method+" "+req.url);
  next()
})
app.use(bodyParser.urlencoded({ extended: false ,limit:'100mb'}));
app.use(express.static(path.join(rootDir, "public")));
app.use("/", index);
app.use("/prescription", prescription);
app.use("/prescription/admin",adminRouter)
app.use('/admin', adminRouter);
app.use("/", prescription);
app.use(prescription);

app.use((req, res, next) => {
  res.status(404).render("error.ejs",{errorCode:404,errorText:"Data Not Found"})
});

// app.listen(3000,'0.0.0.0');
app.listen(3000,()=>{
  console.log("visit http://localhost:3000")
});
