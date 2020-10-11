const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

const patientID = 521;
const doctorId = 125;
const key = "XDXTBDOPQQRX69FD";

router.get("/prescription", (req, res, next) => {
  //   res.sendFile(path.join(rootDir,'views','index.html'));
  res.render("index.ejs", { pageTitle: "Prescription",patientName:'Rofiq',patientWeight:"56",patientSex:'male' });
});

module.exports = router;
