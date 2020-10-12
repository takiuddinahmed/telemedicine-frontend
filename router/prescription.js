const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
const cors = require("../cors");

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

const patientID = 521;
const doctorId = 125;
const key = "XDXTBDOPQQRX69FD";

const previewdata={
  doctorName:"Gorge leo",
  doctorDegree:"MBBS MD",
  doctorSpecializaton:"Medicine Specialist",
  doctorBrunch:"Department Of Medicine",
  doctorCollege:"Chittagong Medical College",
  doctorBMDC:"12345",
  doctorChember:"Crecent Diagnostic Center",
  doctorChemberDetails:"Chawkbazar, Chattogram",
  doctorChemberPhone:"+8801616-666666",
  doctorVisitTime:"4PM - &PM",
  doctorOffDay:"friday",

  patientName:"Kamal Uddin",
  patientAge:"24",
  patientSex:"male",
  patientDate:"10/12/2020",
  patientAddress:"Rajbari,comillah ",
  patientResistration:"20586",
  patientWeight:"63",
  patientMobile:"0159864825465",

  patientCC:"Data is not available yet",
  patientHeart:"S1+S2+M0",
  patientLungs:"NAD",
  patientAbd:"SOFT",
  patientAdvice:"lorem ipsome color sit di amolet Eat fresh live long",

  medicine:[{
    type:"Tab",
    brandName:"Napa",
    genericName:"Paracetamol",
    dose:"625g",
    day:"৭ দিন",
    formation:"১+০+১",
    takingPeriod:"After Eat"
  },{
    type:"Sol",
    brandName:"Napa",
    genericName:"Paracetamol",
    dose:"100ml",
    day:"৭ দিন",
    formation:"১+০+১",
    takingPeriod:"After Eat"
  }],
};

router.get('/preview',cors.corsWithOptions,(req, res, next) => {
  res.render("preview.ejs",previewdata);
});

router.get('/prescription',cors.corsWithOptions,(req, res, next) => {
  res.render("index.ejs", {patientID:'321',doctorID:'123' });
});
module.exports = router;
