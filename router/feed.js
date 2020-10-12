const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
const cors = require("../cors");

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});


module.exports = router;
