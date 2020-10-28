const jwt = require("jsonwebtoken");
const config = require("../config");

const authDoctorMiddleware = (req, res, next) => {
  let token = "";
  if (req.session) token = req.session.token;
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
  authDoctorMiddleware,
};
