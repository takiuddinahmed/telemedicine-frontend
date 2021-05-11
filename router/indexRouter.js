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
      res.render("error", {
          errorCode: 401,
          errorText: "Unauthorized User",
        });
    }
  }
});


router.get("/header_edit", cors.corsWithOptions, (req,res,next)=>{
  const doctorId = req.session.doctorId;
  
  let sql= `SELECT * FROM prescription_header WHERE doctor_id=?`;
  db.query(sql,[doctorId],(err,data)=>{
    console.log({err,data});
    if(err){
      res.render("error", {
          errorCode: 401,
          errorText: "Unauthorized User",
        });
    }
    console.log()
    res.render("header_edit.ejs", {doctor:data[0]});
  })

})

router.get("/header_info",cors.corsWithOptions,(req,res,next)=>{
  const doctorId = req.session.doctorId;
  if(!doctorId){
    res.render("error", {
          errorCode: 401,
          errorText: "Unauthorized User",
        });
  }
  let sql= `SELECT * FROM prescription_header WHERE doctor_id=?`;
  db.query(sql,[doctorId],(err,data)=>{
    if(err){
      res.status(500).json({msg:"internal server error"});
    }
    else{
      res.status(200).json({ok:true,data:data})
    }
  })
})

router.post("/header_info",cors.corsWithOptions,(req,res,next)=>{
  const data= req.body;
  let sql = `
    REPLACE INTO prescription_header 
    (doctor_id,name,degree,speciality,department,institute,reg_details,
      chember_place_name, chember_place_address, chember_contact, chember_visit_time, 
      chember_special_note,background_color, font_color)
    VALUES (?)
  `
  const data_arr = [parseInt(data.doctor_id),data.name,data.degree, data.speciality,
    data.department, data.institute, data.reg_details, data.chember_place_name,
    data.chember_place_address, data.chember_contact, data.chember_visit_time,
    data.chember_special_note, data.background_color, data.font_color
  ]
  db.query(sql, [data_arr],(err,resData)=>{
    if(err){
      res.status(500).json({msg:"internal server error",err:err});
    }
    else{
      res.status(200).json({ok:true,data:data})
    }
  })
})


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
