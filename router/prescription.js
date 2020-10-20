const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
const cors = require("../cors");
const db = require("../database/db");
const utilDB = require("./basicDBOperation");
router.use(express.json());
router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

const patientID = 521;
const doctorId = 125;
const key = "XDXTBDOPQQRX69FD";

const previewdata = {
  doctorName: "Gorge leo",
  doctorDegree: "MBBS MD",
  doctorSpecializaton: "Medicine Specialist",
  doctorBrunch: "Department Of Medicine",
  doctorCollege: "Chittagong Medical College",
  doctorBMDC: "12345",
  doctorChember: "Crecent Diagnostic Center",
  doctorChemberDetails: "Chawkbazar, Chattogram",
  doctorChemberPhone: "+8801616-666666",
  doctorVisitTime: "4PM - 8PM",
  doctorOffDay: "friday",

  patientName: "Kamal Uddin",
  patientAge: "24",
  patientSex: "male",
  patientDate: "10/12/2020",
  patientAddress: "Rajbari,comillah ",
  patientResistration: "20586",
  patientWeight: "63",
  patientMobile: "0159864825465",

  patientCC: "Data is not available yet",
  patientHeart: "S1+S2+M0",
  patientLungs: "NAD",
  patientAbd: "SOFT",
  patientAdvice: "lorem ipsome color sit di amolet Eat fresh live long",

  medicine: [
    {
      type: "Tab",
      brandName: "Napa",
      genericName: "Paracetamol",
      dose: "625g",
      day: "৭ দিন",
      formation: "১+০+১",
      takingPeriod: "After Eat",
    },
    {
      type: "Sol",
      brandName: "Napa",
      genericName: "Paracetamol",
      dose: "100ml",
      day: "৭ দিন",
      formation: "১+০+১",
      takingPeriod: "After Eat",
    },
    {
      type: "Sol",
      brandName: "Napa",
      genericName: "Paracetamol",
      dose: "100ml",
      day: "৭ দিন",
      formation: "১+০+১",
      takingPeriod: "After Eat",
    },
  ],
};

router.get("/preview", cors.corsWithOptions, (req, res, next) => {
  res.render("preview.ejs", previewdata);
});

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
  res.render("index.ejs",previewdata);
});
module.exports = router;
