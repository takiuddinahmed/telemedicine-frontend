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
const puppeteer = require('puppeteer')
const diseaseData = require("./defaultdata/disease");
router.use(express.json());
router.use(
  express.urlencoded(
    { extended: true }
  )
)

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
  let query = req.query.to;
  if (d) {
    let {
      doctor_id, patient_id,doctor_name,date, name, bp, pulse, temp, heart, lungs, abd, anaemia, jaundice, cyanosis, oedema,
      se_nervous_system_palpation, se_nervous_system_inspection, se_nervous_system_percussion, se_nervous_system_auscultation,
      se_cvs_palpation, se_cvs_inspection, se_cvs_percussion, se_cvs_auscultation,
      se_alimentary_system_palpation, se_alimentary_system_inspection, se_alimentary_system_percussion, se_alimentary_system_auscultation,
      se_musculoskeletal_system_palpation, se_musculoskeletal_system_inspection, se_musculoskeletal_system_percussion, se_musculoskeletal_system_auscultation,
      se_respiratory_system_palpation, se_respiratory_system_inspection, se_respiratory_system_percussion, se_respiratory_system_auscultation,
      special_note, cc, investigation, advice, counselling, medicine,fixed_data } = req.body;

    bp = bp.length ? bp : diseaseData.bp;
    pulse = pulse.length ? pulse : diseaseData.pulse;
    temp = temp.length ? temp : diseaseData.temp;
    heart = heart.length ? heart : diseaseData.heart;
    lungs = lungs.length ? lungs : diseaseData.lungs;
    abd = abd.length ? abd : diseaseData.abd;
    anaemia = anaemia.length ? anaemia : diseaseData.default;
    jaundice = jaundice.length ? jaundice : diseaseData.default;
    cyanosis = cyanosis.length ? cyanosis : diseaseData.default;
    oedema = oedema.length ? oedema : diseaseData.default;

    se_nervous_system_palpation = se_nervous_system_palpation && se_nervous_system_palpation.length ? se_nervous_system_palpation : diseaseData.default;
    se_nervous_system_inspection = se_nervous_system_inspection && se_nervous_system_inspection.length ? se_nervous_system_inspection : diseaseData.default;
    se_nervous_system_percussion = se_nervous_system_percussion && se_nervous_system_percussion.length ? se_nervous_system_percussion : diseaseData.default;
    se_nervous_system_auscultation = se_nervous_system_auscultation && se_nervous_system_auscultation.length ? se_nervous_system_auscultation : diseaseData.default;

    se_cvs_palpation = se_cvs_palpation && se_cvs_palpation.length ? se_cvs_palpation : diseaseData.default;
    se_cvs_inspection = se_cvs_inspection && se_cvs_inspection.length ? se_cvs_inspection : diseaseData.default;
    se_cvs_percussion = se_cvs_percussion && se_cvs_percussion.length ? se_cvs_percussion : diseaseData.default;
    se_cvs_auscultation = se_cvs_auscultation && length ? se_cvs_auscultation : diseaseData.default;

    se_alimentary_system_palpation = se_alimentary_system_palpation.length ? se_alimentary_system_palpation : diseaseData.default;
    se_alimentary_system_inspection = se_alimentary_system_inspection.length ? se_alimentary_system_inspection : diseaseData.default;
    se_alimentary_system_percussion = se_alimentary_system_percussion.length ? se_alimentary_system_percussion : diseaseData.default;
    se_alimentary_system_auscultation = se_alimentary_system_auscultation.length ? se_alimentary_system_auscultation : diseaseData.default;

    se_musculoskeletal_system_palpation = se_musculoskeletal_system_palpation.length ? se_musculoskeletal_system_palpation : diseaseData.default;
    se_musculoskeletal_system_inspection = se_musculoskeletal_system_inspection.length ? se_musculoskeletal_system_inspection : diseaseData.default;
    se_musculoskeletal_system_percussion = se_musculoskeletal_system_percussion.length ? se_musculoskeletal_system_percussion : diseaseData.default;
    se_musculoskeletal_system_auscultation = se_musculoskeletal_system_auscultation.length ? se_musculoskeletal_system_auscultation : diseaseData.default;

    se_respiratory_system_palpation = se_respiratory_system_palpation.length ? se_respiratory_system_palpation : diseaseData.default;
    se_respiratory_system_inspection = se_respiratory_system_inspection.length ? se_respiratory_system_inspection : diseaseData.default;
    se_respiratory_system_percussion = se_respiratory_system_percussion.length ? se_respiratory_system_percussion : diseaseData.default;
    se_respiratory_system_auscultation = se_respiratory_system_auscultation.length ? se_respiratory_system_auscultation : diseaseData.default;

    special_note = special_note ? special_note.length : diseaseData.default;

    let sql = `INSERT INTO ${query == 'patient' ? 'patient_' : ''}disease_data ( doctor_id, name,bp,pulse,temp,heart,lungs,abd,anaemia,jaundice,cyanosis,oedema,
    se_nervous_system_palpation,se_nervous_system_inspection,se_nervous_system_percussion,se_nervous_system_auscultation,
    se_cvs_palpation,se_cvs_inspection,se_cvs_percussion,se_cvs_auscultation,
    se_alimentary_system_palpation,se_alimentary_system_inspection,se_alimentary_system_percussion,se_alimentary_system_auscultation,
    se_musculoskeletal_system_palpation,se_musculoskeletal_system_inspection,se_musculoskeletal_system_percussion,se_musculoskeletal_system_auscultation,
    se_respiratory_system_palpation,se_respiratory_system_inspection,se_respiratory_system_percussion,se_respiratory_system_auscultation,
    special_note,cc,investigation,advice,counselling,medicine,fixed_data${query == 'patient' ? ',doctor_name,patient_id,date': ''}) VALUES(?)`
    
    const data_arr = [doctor_id, name, bp, pulse, temp, heart, lungs, abd, anaemia, jaundice, cyanosis, oedema,
      se_nervous_system_palpation, se_nervous_system_inspection, se_nervous_system_percussion, se_nervous_system_auscultation,
      se_cvs_palpation, se_cvs_inspection, se_cvs_percussion, se_cvs_auscultation,
      se_alimentary_system_palpation, se_alimentary_system_inspection, se_alimentary_system_percussion, se_alimentary_system_auscultation,
      se_musculoskeletal_system_palpation, se_musculoskeletal_system_inspection, se_musculoskeletal_system_percussion, se_musculoskeletal_system_auscultation,
      se_respiratory_system_palpation, se_respiratory_system_inspection, se_respiratory_system_percussion, se_respiratory_system_auscultation,
      special_note, cc, investigation, advice, counselling, medicine,fixed_data];
    if(query == 'patient'){
      data_arr.push(doctor_name);
      data_arr.push(patient_id);
      data_arr.push(date);
    }

    db.query(sql, [data_arr], (err, result) => {
        if (err) {
          console.log(err)
          if (err.code == 'ER_DUP_ENTRY') {
            res.json({ ok: false, err: 'Disease already exists.',errmsg:err })
          }
          else
            res.json({ ok: false, err: 'Insert error. Try again', errmsg: err  })
        }
        else {
          res.json({ ok: true })
        }
      })
  } else {
    res.json({ ok: false , err: 'No data'});
  }
});
router.get("/template", cors.corsWithOptions, (req, res) => {
  console.log("------- template -------------");
  let doctor_id = req.session.doctorId;
  let sql = `
  SELECT * FROM cc_template; 
  SELECT * FROM dose_list; 
  SELECT * FROM duration_list; 
  SELECT * FROM investigation; 
  SELECT * FROM advice; 
  SELECT * FROM counselling;
  SELECT * FROM disease_data WHERE doctor_id = -1 OR doctor_id = ?;
  SELECT gd.*,td.* FROM trade_drug_data td LEFT JOIN generic_drug_data gd ON td.generic_name_id = gd.id;
  `;
  utilDB.responseGetReq(sql, [doctor_id], res);
});



router.get("/", cors.corsWithOptions, (req, res, next) => {
  const patientId = req.query.patientid;
  const doctorId = req.query.doctorid;
  const key = req.query.key;
  // console.log({ patientId, doctorId, key });
  if (patientId && doctorId) {
    if (key == config.validateKey) {
      const token = jwt.sign(
        { patientId: patientId, doctorId: doctorId },
        config.jwtKey,
        { expiresIn: "5h" }
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


router.get("/previous-prescription",cors.corsWithOptions,(req,res)=>{
  let patient_id = req.session.patientId;

  if(patient_id){
    let sql =`
      SELECT * from patient_disease_data  WHERE patient_id=? ORDER BY id DESC
    `
    db.query(sql,[patient_id],(err,result)=>{
      if(err){
        res.status(500).json({msg:"Internal Server Error", err: err})
      }
      else{
        res.status(200).json({msg:result})
      }
    })
  }
  else{
    res.json(400).json({msg:"Unauthorized patient"})
  }
})

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

router.get("/pdf-preview",cors.corsWithOptions,(req,res)=>{
  let patient_id = req.session.patientId;

  if (patient_id) {
    let sql = `
      SELECT * from previous_presciptions WHERE patient_id=?
    `
    db.query(sql, [patient_id], (err, result) => {
      if (err) {
        res.status(500).json({ msg: "Internal Server Error", err: err })
      }
      else {
        res.render("prescriptionPdf", { htmlData: result[result.length-1].prescription_details })
      }
    })
  }
  else {
    res.json(400).json({ msg: "Unauthorized patient" })
  }
})


router.post("/pdf",cors.corsWithOptions, async (req,res)=>{
  const prescriptionHtmlData = req.body.prescriptionHtmlData;
  const p_id = req.session.patientId;
  const d_id = req.session.doctorId;

  res.render("prescriptionPdf",{htmlData:prescriptionHtmlData}, async (error,html)=>{
    
    let filename = crypto.pseudoRandomBytes(16).toString("hex") + ".pdf";

    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    })

    // const pdfBuffer = await page.pdf ({format:'Letter'})

    await page.pdf({ format: 'A4', path: "./pdfUpload/" + filename })
    await browser.close();

    if(filename && p_id){
      const result = await postReq(
        `https://outdoorbd.com/rest-api/prescription`,
        {
          key: config.restKey,
          message: 'https://prescription.outdoorbd.com/pdf/'+filename,
          patient_id: p_id,
          doctor_id: d_id
        }
      )
      if(result.ok){
        res.json(result);
      }
      else{
        res.status(404).json({ err: "error happened on api", message: result.err });
      }
    }
    else{
      console.log(p_id)
      res.status(400).json({ err: "error happened", message: {filename, p_id} });
    }
  });




  
})

// router.post("/pdf",cors.corsWithOptions, uploadPdf.single('pdf'), async (req,res)=>{
//   const fileInfo = req.file.filename;
//   const p_id = req.session.patientId;
//   console.log(req.session)
//   if(fileInfo && p_id){
//     const result = await postReq(
//       `https://outdoorbd.com/rest-api/prescription`,
//       {
//         key: config.restKey,
//         message: 'https://prescription.outdoorbd.com/pdf/'+fileInfo,
//         patient_id: p_id
//       }
//     )
//     if(result.ok){
//       // console.log(result)
//       res.json(result);
//     }
//     else{
//       res.status(404).json({ err: "error happened on api", message: result.err });
//     }
//   }
//   else{
//     console.log(p_id)
//     res.status(400).json({ err: "error happened", message: {fileInfo, p_id} });
//   }
// })


router.post("/save-prescription",cors.corsWithOptions,async(req,res)=>{
  if(req.body){
    const prescription_details = req.body.prescription_details;
    const date = req.body.date;
    const patient_id = req.session.patientId;
    const doctor_id = req.session.doctorId;
    const doctor_name = req.body.doctor_name;

    if(patient_id){
      let sql = `
        INSERT INTO previous_presciptions(patient_id, doctor_id, doctor_name, prescription_details,date) VALUES(?)
      `

      db.query(sql,[[patient_id,doctor_id,doctor_name, prescription_details,date]],(err,result)=>{
        if(err){
          res.status(500).json({msg:"Internal server error",err: err});
          console.log(err)
        }
        else{
          res.status(200).json({msg:"success"})
        }
      })
    }
  }
  else {
    res.status(400).json({msg:"Invalid req"})
  }
})


router.post("/doctor-drug-entry", cors.corsWithOptions, (req,res)=>{
  const { trade_name, duration, dose, dose_time} = req.body;

  let sql= `
            INSERT INTO doctor_drug_entry(name,duration,dose,time) VALUES(?)
  `

  db.query(sql, [[trade_name, duration, dose, dose_time]],(err, result)=>{
    if (err) {
      res.status(500).json({ msg: "Internal server error", err: err });
      console.log(err)
    }
    else {
      res.status(200).json({ msg: "success" })
    }
  })
})


router.route("/drug-history", cors.corsWithOptions)
  .get((req,res)=>{
    let id = req.session.patientId;
    if(!id){
      res.status(404).json({ok:false,msg:"no id given"})
    }
    else{
      let sql = `SELECT * from patient_drug_history WHERE patient_id=?`
      db.query(sql, [id],(err,result)=>{
        if (err) {
          res.status(500).json({ok:false, msg: "Internal server error", err: err });
          console.log(err)
        }
        else {
          res.status(200).json({ok:true, res:result[0], msg: "success" })
        }
      })
    }
  })
  .post((req,res)=>{
    const {drug_history,patient_id} = req.body;
    let sql = `
      REPLACE INTO patient_drug_history (patient_id,drug_history) VALUES(?)
    `
    db.query(sql,[[parseInt(patient_id),drug_history]],(err,result)=>{
      if (err) {
        res.status(500).json({ msg: "internal server error", err: err });
      }
      else {
        res.status(200).json({ ok: true, data: result })
      }
    })
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
