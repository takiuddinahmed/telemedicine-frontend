const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("../cors");
const config = require("../config");
const db = require("../database/db");
router.use(express.json());
router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.route("/disease").get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  if (add || edit) {
    res.render("disease");
  } else {
    res.render("diseaseList");
  }
});
router.route("/drug").get((req, res, next) => {
  const add = req.query.add;
  const edit = req.query.edit;
  if (add || edit) {
    res.render("drug");
  } else {
    res.render("drugList");
  }
});

router.route("/doctor").get((req, res, next) => {
  res.render("doctorControl");
});
router.route("/patient").get((req, res, next) => {
  res.render("paitentTable");
});

router.get("");

module.exports = router;
