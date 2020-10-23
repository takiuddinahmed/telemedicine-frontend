const express = require("express");
const router = express.Router();
const session = require("express-session");
const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/path");
const cors = require("../cors");
const db = require("../database/db");
const sendGetReq = require("./requests").sendGetReq;
const config = require("../config");
router.use(express.json());

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.get("/", cors.corsWithOptions, (req, res, next) => {
  const patientId = req.query.patientid;
  const doctorId = req.query.doctorid;
  if (patientId && doctorId) {
    const token = jwt.sign(
      { patientId: patientId, doctorId: patientId },
      config.jwtKey
    );
    req.session.token = token;
    req.session.patientID = patientId;
    req.session.doctorId = doctorId;
    res.redirect("/");
  } else {
    if (req.session.token) {
      res.render("index.ejs", {
        patientID: req.session.patientInfo,
        doctorID: req.session.doctorId,
      });
    } else {
      res.send("Not valid");
    }
  }
});

const getPatientDoctorInfo = async (patientID, doctorId) => {
  let patientInfo = {};
  let doctorInfo = {};
  patientInfo = await sendGetReq(
    `https://outdoorbd.com/rest-api/patient/${patientID}/${config.restKey}`
  );
  doctorInfo = await sendGetReq(
    `https://outdoorbd.com/rest-api/doctor/${doctorId}/${config.restKey}`
  );
  console.log(patientInfo);
  console.log(doctorInfo);
  if (
    patientInfo.ok &&
    patientInfo.res.id &&
    doctorInfo.ok &&
    doctorInfo.res.id
  ) {
    const returnVal = {
      ok: true,
      patientInfo: patientInfo.res,
      doctorInfo: doctorInfo.res,
    };
    console.log(returnVal);
    return returnVal;
  } else {
    const returnValue = { ok: false };
    console.log(returnValue);
    return returnValue;
  }
};

module.exports = router;
