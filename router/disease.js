const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const db = require("../database/db");
const utilDB = require("./basicDBOperation");
const cors = require("../cors");
router.use(bodyParser.json());

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.get("/", cors.corsWithOptions, (req, res) => {
  let sql = `
    SELECT 
    `;
});
