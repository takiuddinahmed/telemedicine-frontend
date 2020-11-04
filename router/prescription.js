const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/path");
const cors = require("../cors");
const config = require("../config");
const db = require("../database/db");
const utilDB = require("./basicDBOperation");
const getReq = require("./requests").sendGetReq;
const authDoctor = require("./auth").authDoctorMiddleware;
const adminRouter = require("./admin");
router.use(express.json());
router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

const patientID = 521;
const doctorId = 125;
const key = "XDXTBDOPQQRX69FD";



router.use("/admin", adminRouter);

router.post("/save", cors.corsWithOptions, (req, res) => {
  let d = req.body;
  console.log(req.body);
  if (d) {
    let sql = `
    INSERT INTO patient_disease_data (
    patient_id, doctor_id, disease_name, bp, pulse, temp, heart, lungs, 
    abd, anaemia, jaundice, cyanosis, oedema, se_nervousSystem, se_respiratorySystem, se_cvs,
    se_alimentarySystem, se_musculoskeletalSystem, specialNote, cc, investigation, advice, 
    counselling, medicine
    )
    VALUES(?)
    `;
    db.query(
      sql,
      [
        [
          d.patient_id,
          d.doctor_id,
          d.disease_name,
          d.bp,
          d.pulse,
          d.temp,
          d.heart,
          d.lungs,
          d.abd,
          d.anaemia,
          d.jaundice,
          d.cyanosis,
          d.oedema,
          d.se_nervousSystem,
          d.se_respiratorySystem,
          d.se_cvs,
          d.se_alimentarySystem,
          d.se_musculoskeletalSystem,
          d.specialNote,
          d.cc,
          d.investigation,
          d.advice,
          d.counselling,
          d.medicine,
          "",
        ],
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ ok: false, message: "Internal server error" });
        } else {
          res
            .status(200)
            .json({ ok: true, message: "success", id: result.insertId });
        }
      }
    );
  } else {
    res.status(400).json({ ok: false });
  }
});
router.get("/template", cors.corsWithOptions, (req, res) => {
  let sql = `
  SELECT * FROM cc_template; 
  SELECT * FROM dose_list; 
  SELECT * FROM duration_list; 
  SELECT * FROM investigation; 
  SELECT * FROM advice; 
  SELECT * FROM counselling;
  SELECT * FROM disease_data;
  SELECT * FROM drug_data;
  `;
  utilDB.responseGetReq(sql, [], res);
});

router.get("/", cors.corsWithOptions, (req, res, next) => {
  const patientId = req.query.patientid;
  const doctorId = req.query.doctorid;
  const key = req.query.key;
  console.log({ patientId, doctorId, key });
  if (patientId && doctorId) {
    if (key == config.validateKey) {
      const token = jwt.sign(
        { patientId: patientId, doctorId: doctorId },
        config.jwtKey,
        { expiresIn: "1h" }
      );
      req.session.token = token;
      req.session.patientId = patientId;
      req.session.doctorId = doctorId;
      res.redirect("/prescription");
    } else {
      req.session.destroy();
      res.render("error", {
        errorCode: 401,
        errorText: "Unauthorized User",
      });
    }
  } else {
    if (req.session.token) {
      jwt.verify(req.session.token, config.jwtKey, (err, jwtresult) => {
        if (err) {
          res.render("error", {
            errorCode: 401,
            errorText: "Unauthorized User",
          });
        } else {
          console.log(req.session);
          res.render("index.ejs");
        }
      });
    } else {
      res.render("error", {
        errorCode: 403,
        errorText: "Forbidden Request",
      });
    }
  }
});

router.get("/logout", cors.corsWithOptions, authDoctor, (req, res) => {
  req.session.destroy();
  res.redirect("/prescription");
});

//doctor patient info update
router.get(
  "/info/:type",
  cors.corsWithOptions,
  authDoctor,
  async (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    const result = await getReq(
      `https://outdoorbd.com/rest-api/${type}/${req[type]}/${config.restKey}`
    );
    if (result.ok) {
      res.json(result.res);
    } else {
      res.status(404).json({ err: "error happened" });
    }
  }
);

module.exports = router;
