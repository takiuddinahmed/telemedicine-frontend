const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/path");
const cors = require("../cors");
const config = require("../config");
const db = require("../database/db");
const utilDB = require("./basicDBOperation");
const getReq = require("./requests").sendGetReq;
const postReq = require("./requests").sendPostReq;
const authDoctor = require("./auth").authDoctorMiddleware;
const adminRouter = require("./admin");
const multer = require('multer');
const crypto = require('crypto');
router.use(express.json());

const pdfStorage = multer.diskStorage({
  destination: function(req,file,callback){
    callback(null,  './pdfUpload');
  },
  filename: function( req,file,cb){
    return crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) {
          return cb(err);
        }
        return cb(null, "" + (raw.toString('hex')) + '.pdf');
    });
  }
})

const uploadPdf = multer({storage: pdfStorage});

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.all("/prescription", (req,res)=>{
  res.redirect('/');
})


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
  console.log("------- template -------------");
  let sql = `
  SELECT * FROM cc_template; 
  SELECT * FROM dose_list; 
  SELECT * FROM duration_list; 
  SELECT * FROM investigation; 
  SELECT * FROM advice; 
  SELECT * FROM counselling;
  SELECT * FROM disease_data;
  SELECT gd.*,td.* FROM trade_drug_data td LEFT JOIN generic_drug_data gd ON td.generic_name_id = gd.id;
  `;
  utilDB.responseGetReq(sql, [], res);
});

// router.get("/template/generic/:generic_id",cors.corsWithOptions,(req,res)=>{
//   let generic_id = req.params.generic_id;
//   let sql = `SELECT * FROM `
// })


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
      res.redirect("/");
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

router.get("/pdf/:filename", cors.corsWithOptions, (req, res)=>{
  let filename = req.params.filename;
  // res.send(filename);
        if (filename) {
            let file_path = path.join(__dirname, '/../pdfUpload', filename);
            fs.exists(file_path, (exist) => {
                if (exist) {
                    res.sendFile(file_path);
                } else {
                    res.status(404).end();
                }
            });
        }
        else {
            res.status(400).end();
        }
})


router.post("/pdf",cors.corsWithOptions, uploadPdf.single('pdf'), async (req,res)=>{
  const fileInfo = req.file.filename;
  const p_id = req.session.patientId;
  if(fileInfo && p_id){
    const result = await postReq(
      `https://outdoorbd.com/rest-api/prescription`,
      {
        key: config.restKey,
        message: 'https://prescription.outdoorbd.com/pdf/'+fileInfo,
        patient_id: p_id
      }
    )
    if(result.ok){
      res.json(res.res);
    }
    else{
      res.status(404).json({ err: "error happened on api", message: result.err });
    }
  }
  else{
    res.status(400).json({ err: "error happened", message: {fileInfo, p_id} });
  }
})

router.get("/logout", cors.corsWithOptions, authDoctor, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//doctor patient info update
router.get(
  "/info/:type",
  cors.corsWithOptions,
  authDoctor,
  async (req, res) => {
    const type = req.params.type;
    if (req[type]){
      const result = await getReq(
        `https://outdoorbd.com/rest-api/${type}/${req[type]}/${config.restKey}`
      );
      if (result.ok) {
        res.json(result.res);
      } else {
        res.status(404).json({ err: "Data Fetch Error" });
      }
    }
    else{
      res.status(404).json({err:"Session ended"})
    }
  }
  
);

module.exports = router;
