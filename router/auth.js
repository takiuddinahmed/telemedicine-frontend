const jwt = require("jsonwebtoken");
const config = require("../config");
const authDoctor = (req, res, next) => {
  let token = "";
  console.log(req.session);
  if (req.session) token = req.session.token;
  console.log(token);
  if (token) {
    jwt.verify(token, config.jwtKey, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ ok: false, message: "token invalid" });
      } else {
        // console.log(decoded);
        req.patient = decoded.patientId;
        req.doctor = decoded.doctorId;
        next();
      }
    });
  } else {
    res.status(401).json({ ok: false, message: "no token" });
  }
};

module.exports = {
  authDoctor,
};
