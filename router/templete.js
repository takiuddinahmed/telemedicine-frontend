const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("../database/db");
const utilDB = require("./basicDBOperation");
const cors = require("../cors");
router.use(bodyParser.json());

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
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

module.exports = router;
